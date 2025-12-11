import type { NextRequest } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]!));

// TEMP: keep true while diagnosing; flip to false later if you prefer a separate auto-reply
const CC_VISITOR_ON_ADMIN = true;

export async function GET() {
  return Response.json({ ok: true, route: "/api/contact", signature: "v2-debug", methods: ["GET","POST","OPTIONS"] });
}
export async function OPTIONS() { return new Response(null, { status: 204 }); }

export async function POST(req: NextRequest) {
  const debug: any = {
    signature: "v2-debug",
    ccVisitorOnAdmin: CC_VISITOR_ON_ADMIN,
    keyPresent: !!process.env.RESEND_API_KEY,
    from: process.env.FROM_EMAIL || "notifications@thehighendchauffeurs.co.uk",
    to: process.env.CONTACT_TO_EMAIL || "info@thehighendchauffeurs.co.uk",
    steps: [] as string[],
  };

  try {
    if (!req.headers.get("content-type")?.includes("application/json")) {
      debug.steps.push("bad-content-type");
      return Response.json({ ok:false, error:"Bad content type", debug }, { status:400 });
    }

    const body = await req.json();
    if (body.companyWebsite) {
      debug.steps.push("honeypot");
      return Response.json({ ok:true, skipped:"honeypot", debug });
    }

    const name    = String(body.name || "").trim().slice(0,80);
    const email   = String(body.email || "").trim().slice(0,160);
    const message = String(body.message || "").trim().slice(0,4000);

    if (!name || !EMAIL.test(email) || message.length < 3) {
      debug.steps.push("invalid-fields");
      return Response.json({ ok:false, error:"Invalid fields", debug }, { status:400 });
    }

    const TO   = debug.to;
    const FROM = debug.from;
    const KEY  = process.env.RESEND_API_KEY;

    if (!KEY) {
      debug.steps.push("no-key-return");
      console.log("Contact (no RESEND_API_KEY):", { name, email, len: message.length });
      return Response.json({ ok:true, debug });
    }

    const resend = new Resend(KEY);
    const subject = `New enquiry — ${name || "Website"}`;
    const html = `
      <h2>New website enquiry</h2>
      <p><b>Name:</b> ${esc(name)}</p>
      <p><b>Email:</b> ${esc(email)}</p>
      <p><b>Message:</b><br/>${esc(message).replace(/\n/g,"<br/>")}</p>
    `;
    const text = `New website enquiry

Name: ${name}
Email: ${email}

Message:
${message}
`;

    // 1) Admin email (optionally CC the visitor)
    const toList = CC_VISITOR_ON_ADMIN ? [TO, email] : [TO];
    debug.steps.push("admin-send-start");
    console.log("ADMIN send ->", { from: FROM, to: toList, replyTo: email });

    const adminSend = await resend.emails.send({
      from: `T.H.E Chauffeurs <${FROM}>`,
      to: toList,
      replyTo: [email],
      subject,
      html,
      text,
    });

    if (adminSend.error) {
      debug.steps.push("admin-send-error");
      debug.adminError = String(adminSend.error?.message || adminSend.error);
      console.error("Resend admin error:", adminSend.error);
      return Response.json({ ok:false, step:"admin", debug }, { status:502 });
    }
    debug.steps.push("admin-send-ok");
    debug.adminId = (adminSend as any)?.data?.id ?? (adminSend as any)?.id ?? null;

    if (CC_VISITOR_ON_ADMIN) {
      debug.steps.push("auto-reply-skipped-cc");
      return Response.json({ ok:true, debug }, { status:200, headers:{ "Cache-Control":"no-store" } });
    }

    // 2) Dedicated auto-reply (only when CC is off)
    if (EMAIL.test(email)) {
      debug.steps.push("auto-start");
      console.log("AUTO-REPLY send ->", { from: FROM, to: email, replyTo: TO });

      const auto = await resend.emails.send({
        from: `T.H.E Chauffeurs <${FROM}>`,
        to: email,
        replyTo: [TO],
        subject: "We received your message — T.H.E Chauffeurs",
        html: `
          <p>Hi ${esc(name) || "there"},</p>
          <p>Thanks for contacting <b>T.H.E Chauffeurs</b>. We’ve received your message and will respond shortly.</p>
          <p><i>Your message:</i></p>
          <blockquote>${esc(message).replace(/\n/g,"<br/>")}</blockquote>
          <p>Best regards,<br/>T.H.E Chauffeurs</p>
        `,
        text: `Hi ${name || "there"},

Thanks for contacting T.H.E Chauffeurs. We’ve received your message and will respond shortly.

Your message:
${message}

Best regards,
T.H.E Chauffeurs
`,
      });

      if (auto.error) {
        debug.steps.push("auto-error");
        debug.autoError = String(auto.error?.message || auto.error);
        console.error("Resend auto-reply error:", auto.error);
      } else {
        debug.steps.push("auto-ok");
        debug.autoId = (auto as any)?.data?.id ?? (auto as any)?.id ?? null;
      }
    }

    return Response.json({ ok:true, debug }, { status:200, headers:{ "Cache-Control":"no-store" } });

  } catch (e) {
    console.error("Contact API error:", e);
    return Response.json({ ok:false, debug: { signature: "v2-debug", crashed: true } }, { status:500 });
  }
}
