import Image from "next/image";

export default function Home() {
  return (
    <main className="relative h-dvh w-full overflow-hidden bg-black">
      {/* Background image with a fixed focal point */}
      <Image
        src="/images/TheHighEnd.jpeg"
        alt="The High-End Chauffeurs"
        fill
        priority
        sizes="100vw"
        className="
          object-cover
          brightness-75
          object-[50%_60%] md:object-[50%_55%]  /* tweak focal point per breakpoint */
        "
      />

      {/* Overlay text (locked position across devices) */}
      <h1
        className="
          absolute left-1/2 -translate-x-1/2
          bottom-16 md:bottom-24 lg:bottom-32
          text-[#C9A227]
          text-4xl sm:text-5xl md:text-6xl lg:text-7xl
          font-bold tracking-widest uppercase
          text-center px-4 select-none pointer-events-none
        "
      >
        Coming Soon...
      </h1>
    </main>
  );
}
