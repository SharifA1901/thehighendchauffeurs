// src/app/api/contact/route.ts
import type { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// simple HTML escaper
function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );
}

export async function POST(req: NextRequest) {
  try {
    // Only accept JSON
    if (!req.headers.get("content-type")?.includes("application/json")) {
      return Response.json({ ok: false, error: "Bad content type" }, { status: 400 });
    }

    const body = await req.json();
    const name = String(body?.name ?? "");
    const email = String(body?.email ?? "");
    const message = String(body?.message ?? "");
    const honeypot = String(body?._hp ?? ""); // optional hidden field in your form

    // Honeypot: if bots fill it, pretend success
    if (honeypot) return Response.json({ ok: true }, { status: 200 });

    if (!message.trim()) {
      return Response.json({ ok: false, error: "Message required" }, { status: 400 });
    }

    const to = process.env.CONTACT_TO_EMAIL || "info@thehighendchauffeurs.co.uk";
    const from = process.env.FROM_EMAIL || "onboarding@resend.dev";

    // If no key configured, just log and succeed so the UI doesn't block
    if (!process.env.RESEND_API_KEY) {
      console.log("Contact form (mock send):", { name, email, message });
      return Response.json({ ok: true }, { status: 200 });
    }

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email ? [email] : undefined, // reply goes to the sender
      subject: `New enquiry — ${name || "Website"}`,
      html: `
        <h2>New website enquiry</h2>
        <p><b>Name:</b> ${esc(name)}</p>
        <p><b>Email:</b> ${esc(email)}</p>
        <p><b>Message:</b><br/>${esc(message).replace(/\n/g, "<br/>")}</p>
      `,
      text: `New website enquiry

Name: ${name}
Email: ${email}

Message:
${message}`,
    });

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
