// src/app/api/contact/route.ts
import { Resend } from "resend";

export const runtime = "nodejs"; // ensure serverless function on Vercel

const resend = new Resend(process.env.RESEND_API_KEY);

type Body = { name?: string; email?: string; message?: string; _hp?: string };

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );
}

// Health check: GET /api/contact
export async function GET() {
  return Response.json({ ok: true, route: "/api/contact", methods: ["GET", "POST", "OPTIONS"] });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "content-type",
    },
  });
}

export async function POST(req: Request) {
  try {
    if (!req.headers.get("content-type")?.includes("application/json")) {
      return Response.json({ ok: false, error: "Expected JSON" }, { status: 400 });
    }

    const { name = "", email = "", message = "", _hp = "" } = (await req.json()) as Body;
    if (_hp) return Response.json({ ok: true }); // honeypot

    const to = process.env.CONTACT_TO_EMAIL || "info@thehighendchauffeurs.co.uk";
    let from = process.env.FROM_EMAIL || "website@thehighendchauffeurs.co.uk";

    if (!process.env.RESEND_API_KEY) {
      console.log("Contact form (mock):", { name, email, message });
      return Response.json({ ok: true });
    }

    const send = async (sender: string) =>
      resend.emails.send({
        from: sender,
        to,
        replyTo: email ? [email] : undefined, // Node SDK uses camelCase
        subject: `New enquiry — ${name || "Website"}`,
        html: `
          <h2>New website enquiry</h2>
          <p><b>Name:</b> ${esc(name)}</p>
          <p><b>Email:</b> ${esc(email)}</p>
          <p><b>Message:</b><br/>${esc(message).replace(/\n/g, "<br/>")}</p>
        `,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      });

    let { error } = await send(from);

    if (error && from !== "onboarding@resend.dev") {
      from = "onboarding@resend.dev";
      ({ error } = await send(from));
    }

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ ok: false }, { status: 502 });
    }

    return Response.json({ ok: true }, { status: 200, headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("Contact API error:", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}
