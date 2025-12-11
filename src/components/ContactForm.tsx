"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);

    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot: bots will often fill hidden fields
    if (fd.get("companyWebsite")) {
      setStatus("sent");
      form.reset();
      return;
    }

    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      message: String(fd.get("message") || ""),
      // keep the hp in payload so server can double-check
      companyWebsite: String(fd.get("companyWebsite") || ""),
    };

    try {
      setStatus("sending");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        const j = await res.json().catch(() => ({}));
        setErrorMsg(j?.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-xl mx-auto space-y-4">
      {/* Honeypot (visually hidden, kept accessible-ignored) */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="companyWebsite">Company website</label>
        <input
          id="companyWebsite"
          name="companyWebsite"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm text-neutral-300 mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            maxLength={80}
            className="w-full rounded-xl bg-neutral-900/50 ring-1 ring-neutral-700 focus:ring-2 focus:ring-yellow-600 px-4 py-3 text-neutral-100 placeholder-neutral-400 outline-none"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm text-neutral-300 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={160}
            className="w-full rounded-xl bg-neutral-900/50 ring-1 ring-neutral-700 focus:ring-2 focus:ring-yellow-600 px-4 py-3 text-neutral-100 placeholder-neutral-400 outline-none"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-neutral-300 mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          maxLength={4000}
          className="w-full rounded-xl bg-neutral-900/50 ring-1 ring-neutral-700 focus:ring-2 focus:ring-yellow-600 px-4 py-3 text-neutral-100 placeholder-neutral-400 outline-none"
          placeholder="Tell us what you need"
        />
      </div>

      <button
        disabled={status === "sending"}
        className="w-full md:w-auto inline-flex items-center justify-center rounded-xl bg-[#C9A227] px-6 py-3 font-semibold tracking-wide text-black hover:brightness-95 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      {status === "sent" && (
        <p className="text-green-400 text-sm">
          Thanks — we’ve got your message and will get back to you shortly.
        </p>
      )}

      {status === "error" && (
        <p className="text-red-400 text-sm">
          {errorMsg ??
            "Sorry, something went wrong. Please email "}
          <a className="underline" href="mailto:info@thehighendchauffeurs.co.uk">
            info@thehighendchauffeurs.co.uk
          </a>
          .
        </p>
      )}
    </form>
  );
}
