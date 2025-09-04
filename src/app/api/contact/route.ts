import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "info@thehighendchauffeurs.co.uk";

    if (RESEND_API_KEY && CONTACT_TO_EMAIL) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "website@thehighendchauffeurs.co.uk",
          to: CONTACT_TO_EMAIL,
          subject: `New enquiry — ${data.name ?? "Website"}`,
          html: `
            <h2>New website enquiry</h2>
            <p><b>Name:</b> ${escapeHtml(String(data.name ?? ""))}</p>
            <p><b>Email:</b> ${escapeHtml(String(data.email ?? ""))}</p>
            <p><b>Message:</b></p>
            <p>${escapeHtml(String(data.message ?? "")).replace(/\n/g, "<br/>")}</p>
          `,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
    } else {
      console.log("Contact form (no email configured):", data);
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]!));
}
