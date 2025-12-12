"use client";

import { useMemo, useState } from "react";

type VehicleClassId = "business" | "first" | "mpv";

type VehicleClass = {
  id: VehicleClassId;
  label: string;
  tag: string;
  recommended?: boolean;
  bullets: string[];
  blurb: string;
  amenities: string[];
};

const VEHICLE_CLASSES: VehicleClass[] = [
  {
    id: "business",
    label: "Business class",
    tag: "Category",
    bullets: [
      "Mercedes-Benz E-Class or equivalent",
      "1–3 passengers",
      "2 large suitcases",
    ],
    blurb:
      "A refined option for airport transfers and corporate travel — comfortable, quiet and discreet.",
    amenities: [
      "Leather interior",
      "Climate control",
      "Complimentary bottled water",
      "Phone charging on request",
    ],
  },
  {
    id: "first",
    label: "First class",
    tag: "Recommended",
    recommended: true,
    bullets: [
      "Mercedes-Benz S-Class or equivalent",
      "1–2 passengers",
      "Maximum comfort & legroom",
    ],
    blurb:
      "Our flagship experience for VIPs and special occasions — the highest level of comfort and presence.",
    amenities: [
      "Premium leather interior",
      "Enhanced rear comfort",
      "Complimentary bottled water",
      "Phone charging on request",
    ],
  },
  {
    id: "mpv",
    label: "MPV / Group",
    tag: "Category",
    bullets: [
      "Mercedes-Benz V-Class or equivalent",
      "Up to 6 passengers",
      "Ideal for families & groups",
    ],
    blurb:
      "Spacious and flexible — ideal for groups, luggage-heavy trips and multi-stop itineraries.",
    amenities: [
      "Spacious seating",
      "Flexible luggage capacity",
      "Complimentary bottled water",
      "Phone charging on request",
    ],
  },
];

export default function FleetSection() {
  const [selectedId, setSelectedId] = useState<VehicleClassId>("first");

  const selected = useMemo(
    () => VEHICLE_CLASSES.find((v) => v.id === selectedId) ?? VEHICLE_CLASSES[0],
    [selectedId]
  );

  return (
    <section
      id="fleet"
      className="border-b border-neutral-900 bg-neutral-950 px-4 py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              Our fleet
            </h2>
            <p className="mt-2 max-w-xl text-sm text-neutral-400">
              Luxury vehicles prepared for every journey, driven by professional
              chauffeurs. Exact models available on request.
            </p>
          </div>
          <p className="text-xs text-neutral-500">
            *Vehicle availability may vary by date/time
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.7fr,1.1fr]">
          {/* Cards */}
          <div className="grid gap-5 md:grid-cols-3">
            {VEHICLE_CLASSES.map((vehicle) => {
              const isSelected = vehicle.id === selectedId;

              return (
                <button
                  key={vehicle.id}
                  type="button"
                  onClick={() => setSelectedId(vehicle.id)}
                  className={[
                    "text-left rounded-2xl border p-5 bg-black/40 transition-all duration-150",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]/70",
                    isSelected
                      ? "border-[#C9A227]/80 shadow-[0_0_40px_rgba(201,162,39,0.25)]"
                      : "border-neutral-800 hover:border-neutral-600 hover:-translate-y-1",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold tracking-[0.25em] text-neutral-400 uppercase">
                        {vehicle.recommended ? "Recommended" : vehicle.tag}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-white">
                        {vehicle.label}
                      </h3>
                    </div>

                    {vehicle.recommended && (
                      <span className="mt-1 inline-flex items-center rounded-full border border-[#C9A227]/60 bg-[#C9A227]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A227]">
                        Popular
                      </span>
                    )}
                  </div>

                  <ul className="mt-4 space-y-2 text-xs text-neutral-300">
                    {vehicle.bullets.map((d) => (
                      <li key={d} className="flex gap-2">
                        <span className="mt-0.5 text-[#C9A227]">•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <aside className="rounded-2xl border border-neutral-800 bg-black/60 p-6 shadow-sm">
            <p className="text-[11px] font-semibold tracking-[0.3em] text-neutral-400 uppercase">
              Selected class
            </p>
            <h3 className="mt-2 text-xl font-semibold text-white">
              {selected.label}
            </h3>

            <p className="mt-4 text-sm text-neutral-300">{selected.blurb}</p>

            <div className="mt-5">
              <p className="text-[11px] font-semibold tracking-[0.25em] text-neutral-400 uppercase">
                Included
              </p>
              <ul className="mt-3 space-y-2 text-xs text-neutral-300">
                {selected.amenities.map((a) => (
                  <li key={a} className="flex gap-2">
                    <span className="mt-0.5 text-[#C9A227]">✔</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#enquiry"
              className="mt-6 block w-full text-center rounded-full bg-[#C9A227] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-black hover:brightness-95 transition"
            >
              Enquire about {selected.label.toLowerCase()}
            </a>

            <p className="mt-2 text-[11px] text-neutral-500">
              Tell us your preferred class in the form and we’ll confirm
              availability.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
