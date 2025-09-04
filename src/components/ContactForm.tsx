"use client";

import { useState } from "react";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    try {
      setState("sending");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setState("sent");
        form.reset();
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-xl mx-auto space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm text-neutral-300 mb-1">Name</label>
          <input
            id="name" name="name" required
            className="w-full rounded-xl bg-neutral-900/50 ring-1 ring-neutral-700 focus:ring-2 focus:ring-yellow-600 px-4 py-3 text-neutral-100 placeholder-neutral-400 outline-none"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm text-neutral-300 mb-1">Email</label>
          <input
            id="email" name="email" type="email" required
            className="w-full rounded-xl bg-neutral-900/50 ring-1 ring-neutral-700 focus:ring-2 focus:ring-yellow-600 px-4 py-3 text-neutral-100 placeholder-neutral-400 outline-none"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-neutral-300 mb-1">Message</label>
        <textarea
          id="message" name="message" rows={5} required
          className="w-full rounded-xl bg-neutral-900/50 ring-1 ring-neutral-700 focus:ring-2 focus:ring-yellow-600 px-4 py-3 text-neutral-100 placeholder-neutral-400 outline-none"
          placeholder="Tell us what you need"
        />
      </div>

      <button
        disabled={state === "sending"}
        className="w-full md:w-auto inline-flex items-center justify-center rounded-xl bg-[#C9A227] px-6 py-3 font-semibold tracking-wide text-black hover:brightness-95 disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Send message"}
      </button>

      {state === "sent" && (
        <p className="text-green-400 text-sm">Thanks — we’ll be in touch shortly.</p>
      )}
      {state === "error" && (
        <p className="text-red-400 text-sm">
          Sorry, something went wrong. Please email{" "}
          <a className="underline" href="mailto:info@thehighendchauffeurs.co.uk">
            info@thehighendchauffeurs.co.uk
          </a>.
        </p>
      )}
    </form>
  );
}
