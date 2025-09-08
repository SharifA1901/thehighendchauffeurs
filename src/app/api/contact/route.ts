// src/app/api/contact/route.ts
import type { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]!)
  );
}

export async function POST(req: NextRequest) {
  try {
    if (!req.headers.get("content-type")?.includes("application/json")) {
      return Response.json({ ok: false, error: "Bad content type" }, { status: 400 });
    }

    const { name = "", email = "", message = "" } = await req.json();

    const to   = process.env.CONTACT_TO_EMAIL || "info@thehighendchauffeurs.co.uk";
    let from   = process.env.FROM_EMAIL || "website@thehighendchauffeurs.co.uk";

    // If no API key configured, just log and succeed (so the UI doesn’t block).
    if (!process.env.RESEND_API_KEY) {
      console.log("Contact form (mock):", { name, email, message });
      return Response.json({ ok: true }, { status: 200 });
    }

    // Helper to send
    const send = async (sender: string) =>
      await resend.emails.send({
        from: sender,
        to,
        replyTo: email ? [email] : undefined,
        subject: `New enquiry — ${name || "Website"}`,
        html: `
          <h2>New website enquiry</h2>
          <p><b>Name:</b> ${esc(name)}</p>
          <p><b>Email:</b> ${esc(email)}</p>
          <p><b>Message:</b><br/>${esc(message).replace(/\n/g,"<br/>")}</p>
        `,
        text: `New website enquiry

Name: ${name}
Email: ${email}

Message:
${message}`,
      });

    // Try with configured FROM first
    let { error } = await send(from);

    // If domain isn’t verified (common), retry with onboarding sender
    if (error && String(error).toLowerCase().includes("domain") && String(error).toLowerCase().includes("verify")) {
      from = "onboarding@resend.dev";
      ({ error } = await send(from));
    }

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ ok: false }, { status: 502 });
    }

    return Response.json({ ok: true }, { status: 200, headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    console.error("Contact API error:", e);
    return Response.json({ ok: false }, { status: 500 });
  }
}
