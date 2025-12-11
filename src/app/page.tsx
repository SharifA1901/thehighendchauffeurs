import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import logo from "../../public/images/TheHighEnd.jpeg";

export default function Home() {
  return (
    <main className="min-h-dvh bg-black text-neutral-100 flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-20 border-b border-neutral-800 bg-black/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
          <div className="flex items-center gap-3">
            <Image
              src={logo}
              alt="T.H.E Chauffeurs logo"
              className="h-10 w-auto rounded-sm"
            />
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-neutral-300">
                T.H.E Chauffeurs
              </p>
              <p className="text-xs text-neutral-500">
                The High End Chauffeurs
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-neutral-300 md:flex">
            <a href="#services" className="hover:text-white">
              Services
            </a>
            <a href="#fleet" className="hover:text-white">
              Fleet
            </a>
            <a href="#why-us" className="hover:text-white">
              Why us
            </a>
            <a href="#contact" className="hover:text-white">
              Contact
            </a>
          </nav>

          <a
            href="tel:+447000000000" // TODO: put your real number here
            className="inline-flex items-center rounded-full bg-[#C9A227] px-4 py-2 text-sm font-semibold text-black shadow-md hover:brightness-95 transition"
          >
            Call now
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-neutral-900">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-[#C9A227]/20 blur-3xl" />
          <div className="absolute bottom-0 right-[-6rem] h-80 w-80 rounded-full bg-neutral-700/30 blur-3xl" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16 md:flex-row md:items-center md:py-24">
          <div className="flex-1">
            <p className="text-xs font-semibold tracking-[0.3em] text-neutral-400 uppercase">
              LONDON · UK-WIDE · 24/7
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
              Luxury chauffeur service
              <span className="block text-[#C9A227] mt-2">
                for those who expect more.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm sm:text-base text-neutral-300">
              Professional chauffeurs, immaculate vehicles and discreet,
              door-to-door service for airport transfers, business travel and
              special occasions across London and the UK.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-[#C9A227] px-6 py-2.5 text-sm font-semibold text-black hover:brightness-95 transition"
              >
                Get a quote
              </a>
              <a
                href="tel:+447000000000" // TODO: real number
                className="inline-flex items-center justify-center rounded-full border border-neutral-700 px-6 py-2.5 text-sm font-semibold text-neutral-100 hover:border-neutral-500 transition"
              >
                Speak to a chauffeur
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <span>✓</span> Flight monitoring
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span> Meet &amp; greet service
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span> Bottled water &amp; Wi-Fi
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="mx-auto max-w-md rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900/80 to-black p-6 shadow-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400 mb-3">
                Instant enquiry
              </p>
              <p className="text-sm text-neutral-300 mb-4">
                Share your journey details and we&apos;ll respond promptly with
                availability and pricing.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="border-b border-neutral-900 bg-black px-4 py-16 md:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Our services
          </h2>
          <p className="mt-2 max-w-xl text-sm text-neutral-400">
            Whether it&apos;s a single airport run or a full day of on-call
            chauffeuring, we tailor every journey to you.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-4">
            <ServiceCard
              title="Airport transfers"
              description="Stress-free collections and drop-offs at all London airports with flight tracking and waiting time included."
              icon="✈️"
            />
            <ServiceCard
              title="Business travel"
              description="Reliable transport for executives, roadshows, meetings and corporate hospitality."
              icon="💼"
            />
            <ServiceCard
              title="Events & evenings"
              description="Arrive in style for dinners, premieres, concerts, weddings and special occasions."
              icon="🥂"
            />
            <ServiceCard
              title="As-directed hourly"
              description="Your chauffeur and vehicle on standby for flexible itineraries and multiple stops."
              icon="🕒"
            />
          </div>
        </div>
      </section>

      {/* FLEET */}
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
                New-shape luxury vehicles driven by experienced, discreet
                chauffeurs. Cleaned and inspected before every journey.
              </p>
            </div>
            <p className="text-xs text-neutral-500">
              *Exact models available on request
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <FleetCard
              label="Business class"
              details={[
                "Mercedes-Benz E-Class or equivalent",
                "1–3 passengers",
                "2 large suitcases",
              ]}
            />
            <FleetCard
              label="First class"
              details={[
                "Mercedes-Benz S-Class or equivalent",
                "1–2 passengers",
                "Ultimate comfort & legroom",
              ]}
              highlight
            />
            <FleetCard
              label="MPV / Group"
              details={[
                "Mercedes-Benz V-Class or equivalent",
                "Up to 6 passengers",
                "Ideal for families & groups",
              ]}
            />
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section
        id="why-us"
        className="border-b border-neutral-900 bg-black px-4 py-16 md:py-20"
      >
        <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              Why choose T.H.E Chauffeurs?
            </h2>
            <p className="mt-3 text-sm text-neutral-300">
              We&apos;re building a service that feels more personal, more
              considered and more reliable than app-only operators.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-neutral-300">
              <li className="flex gap-3">
                <span className="mt-1 text-[#C9A227]">◆</span>
                <div>
                  <p className="font-medium text-white">
                    Professional, vetted chauffeurs
                  </p>
                  <p className="text-xs text-neutral-400">
                    Experienced drivers with excellent local knowledge and
                    impeccable presentation.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 text-[#C9A227]">◆</span>
                <div>
                  <p className="font-medium text-white">
                    Discreet & confidential
                  </p>
                  <p className="text-xs text-neutral-400">
                    Ideal for high-profile, VIP and corporate clients who value
                    privacy.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 text-[#C9A227]">◆</span>
                <div>
                  <p className="font-medium text-white">
                    Transparent, pre-agreed pricing
                  </p>
                  <p className="text-xs text-neutral-400">
                    Fixed quotes with no surge pricing or hidden extras.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 text-[#C9A227]">◆</span>
                <div>
                  <p className="font-medium text-white">
                    Always on, always monitored
                  </p>
                  <p className="text-xs text-neutral-400">
                    24/7 availability, with live flight and traffic monitoring
                    for smooth arrivals.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-6 md:p-8">
            <h3 className="text-sm font-semibold tracking-[0.3em] text-neutral-400 uppercase">
              How it works
            </h3>
            <ol className="mt-5 space-y-4 text-sm text-neutral-200">
              <li className="flex gap-3">
                <span className="mt-1 h-6 w-6 shrink-0 rounded-full border border-neutral-600 text-xs flex items-center justify-center">
                  1
                </span>
                <div>
                  <p className="font-medium">Send your journey details</p>
                  <p className="text-xs text-neutral-400">
                    Use the contact form or call us with your pickup, drop-off,
                    date and time.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-6 w-6 shrink-0 rounded-full border border-neutral-600 text-xs flex items-center justify-center">
                  2
                </span>
                <div>
                  <p className="font-medium">Receive a tailored quote</p>
                  <p className="text-xs text-neutral-400">
                    We&apos;ll confirm availability, recommend the right vehicle
                    and provide a fixed price.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-6 w-6 shrink-0 rounded-full border border-neutral-600 text-xs flex items-center justify-center">
                  3
                </span>
                <div>
                  <p className="font-medium">Relax, we&apos;ll handle the rest</p>
                  <p className="text-xs text-neutral-400">
                    Your chauffeur arrives early, tracks your flight if
                    applicable, and takes care of every detail.
                  </p>
                </div>
              </li>
            </ol>

            <div className="mt-6 rounded-2xl bg-black/60 px-4 py-3 text-xs text-neutral-300 border border-neutral-800">
              <p className="font-medium text-white mb-1">
                Coverage: London &amp; UK-wide
              </p>
              <p>
                Based in London with regular trips to Heathrow, Gatwick,
                Stansted, Luton, City Airport and major UK cities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="bg-neutral-950 px-4 py-16 md:py-20"
      >
        <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-[1.1fr,1fr]">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              Request a quote or availability
            </h2>
            <p className="mt-2 text-sm text-neutral-300">
              Tell us when and where you&apos;re travelling, and we&apos;ll
              respond quickly with a personalised quote.
            </p>

            <div className="mt-6 space-y-3 text-sm text-neutral-300">
              <p className="flex items-center gap-2">
                <span className="text-[#C9A227]">☎</span>
                <a
                  href="tel:+447000000000" // TODO: real number
                  className="hover:text-white underline-offset-4 hover:underline"
                >
                  +44 (0) 7000 000 000
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#C9A227]">@</span>
                <a
                  href="mailto:info@thehighendchauffeurs.co.uk"
                  className="hover:text-white underline-offset-4 hover:underline"
                >
                  info@thehighendchauffeurs.co.uk
                </a>
              </p>
              <p className="text-xs text-neutral-500">
                If your journey is within the next 12 hours, we recommend
                calling for the fastest response.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-800 bg-black/70 p-6 md:p-7">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-900 bg-black px-4 py-6 text-xs text-neutral-500">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} T.H.E Chauffeurs. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <span>Private hire &amp; chauffeur services</span>
            <span className="hidden h-3 w-px bg-neutral-800 md:inline-block" />
            <span>Fully insured · Professional drivers</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

type ServiceCardProps = {
  title: string;
  description: string;
  icon: string;
};

function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950/70 p-5 text-sm shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <h3 className="font-semibold text-white">{title}</h3>
      </div>
      <p className="mt-3 text-xs text-neutral-400">{description}</p>
    </div>
  );
}

type FleetCardProps = {
  label: string;
  details: string[];
  highlight?: boolean;
};

function FleetCard({ label, details, highlight }: FleetCardProps) {
  return (
    <div
      className={[
        "rounded-2xl border p-5 text-sm shadow-sm bg-neutral-950/80",
        highlight
          ? "border-[#C9A227]/70 shadow-[0_0_40px_rgba(201,162,39,0.20)]"
          : "border-neutral-800",
      ].join(" ")}
    >
      <p className="text-xs font-semibold tracking-[0.25em] text-neutral-400 uppercase">
        {highlight ? "Recommended" : "Category"}
      </p>
      <h3 className="mt-2 text-lg font-semibold text-white">{label}</h3>
      <ul className="mt-4 space-y-2 text-xs text-neutral-300">
        {details.map((d) => (
          <li key={d} className="flex gap-2">
            <span className="mt-0.5 text-[#C9A227]">•</span>
            <span>{d}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
