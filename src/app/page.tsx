import Image from "next/image";
import ContactForm from "@/components/ContactForm";
// static import from public via RELATIVE path (page.tsx is in src/app)
import logo from "../../public/images/TheHighEnd.jpeg";

export default function Home() {
  return (
    <main className="min-h-dvh bg-black text-neutral-100 flex flex-col">
      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center pt-16 md:pt-24">
        <Image
          src={logo}
          alt="T.H.E Chauffeurs logo"
          priority
          className="h-auto w-[240px] sm:w-[300px] md:w-[380px] select-none pointer-events-none"
        />
        <h1
          className="mt-10 text-[#C9A227]
                     text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                     font-extrabold tracking-widest uppercase text-center"
        >
          Coming Soon...
        </h1>
        <p className="mt-4 max-w-xl text-center text-neutral-400 px-4">
          Premium, discreet and reliable chauffeuring across the UK. Bookings open soon.
        </p>
      </section>

      {/* CONTACT */}
      <section className="mt-16 md:mt-24 mb-24 px-4">
        <div className="mx-auto w-full max-w-2xl rounded-2xl bg-neutral-900/40 ring-1 ring-neutral-800 p-6 md:p-8 backdrop-blur">
          <h2 className="text-2xl font-semibold tracking-wide text-white mb-2 text-center">
            Contact Us
          </h2>
          <p className="text-sm text-neutral-400 mb-6 text-center">
            Drop us a line and we’ll get back to you.
          </p>
          <ContactForm />
          <p className="mt-4 text-center text-sm text-neutral-500">
            Prefer email?{" "}
            <a
              href="mailto:info@thehighendchauffeurs.co.uk"
              className="underline hover:text-neutral-300"
            >
              info@thehighendchauffeurs.co.uk
            </a>
          </p>
        </div>
      </section>

      <footer className="mt-auto pb-8 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} T.H.E Chauffeurs. All rights reserved.
      </footer>
    </main>
  );
}
