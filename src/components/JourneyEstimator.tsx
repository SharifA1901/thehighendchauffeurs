"use client";

import { useState } from "react";

type EstimateResult = {
  ok: boolean;
  distanceMiles?: string;
  durationMinutes?: number;
  fare?: {
    min: number;
    max: number;
  };
  error?: string;
};

export default function JourneyEstimator() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicle, setVehicle] = useState("business");
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleEstimate() {
    if (!pickup || !destination) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pickup, destination, vehicle }),
      });

      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ ok: false, error: "Something went wrong." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="border-b border-neutral-900 bg-neutral-950 px-4 py-16">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold text-white">
            Estimate your journey
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            Enter your route and vehicle to get an estimated fare.
          </p>

          <div className="mt-6 space-y-4">
            <input
              placeholder="Pickup location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full rounded-xl bg-neutral-900 p-3 text-white outline-none ring-1 ring-neutral-700 focus:ring-2 focus:ring-[#C9A227]"
            />

            <input
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full rounded-xl bg-neutral-900 p-3 text-white outline-none ring-1 ring-neutral-700 focus:ring-2 focus:ring-[#C9A227]"
            />

            <select
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className="w-full rounded-xl bg-neutral-900 p-3 text-white outline-none ring-1 ring-neutral-700 focus:ring-2 focus:ring-[#C9A227]"
            >
              <option value="business">Business Class</option>
              <option value="first">First Class</option>
              <option value="mpv">MPV / Group</option>
            </select>

            <button
              type="button"
              onClick={handleEstimate}
              disabled={loading}
              className="w-full rounded-xl bg-[#C9A227] py-3 font-semibold text-black transition hover:brightness-95 disabled:opacity-60"
            >
              {loading ? "Calculating..." : "Calculate estimate"}
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-black/60 p-6">
          {!result && (
            <p className="text-sm text-neutral-400">
              Your estimate will appear here.
            </p>
          )}

          {result && !result.ok && (
            <p className="text-sm text-red-400">
              {result.error || "Unable to calculate estimate."}
            </p>
          )}

          {result?.ok && result.fare && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-400">Estimated fare</p>

              <h3 className="text-3xl font-bold text-[#C9A227]">
                £{result.fare.min} – £{result.fare.max}
              </h3>

              <div className="space-y-1 text-sm text-neutral-300">
                <p>Distance: {result.distanceMiles} miles</p>
                <p>Duration: {result.durationMinutes} mins</p>
              </div>

              <a
                href="#contact"
                className="inline-block rounded-full bg-white px-5 py-2 text-sm font-semibold text-black"
              >
                Continue enquiry
              </a>

              <p className="mt-2 text-xs text-neutral-500">
                Estimated fare only. Final price confirmed on enquiry.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}