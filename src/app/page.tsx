import Image from "next/image";

export default function Home() {
  return (
    <main className="relative h-screen w-screen overflow-hidden">
      {/* Desktop */}
      <Image
        src="/images/TheHighEnd-desktop.jpeg"
        alt="The High-End Chauffeurs"
        fill
        priority
        sizes="100vw"
        className="hidden md:block object-cover brightness-75 object-center"
      />

      {/* Mobile */}
      <Image
        src="/images/TheHighEnd-mobile.jpeg"
        alt="The High-End Chauffeurs"
        fill
        priority
        sizes="100vw"
        className="md:hidden object-cover brightness-75 object-center"
      />

      {/* Overlay text */}
      <h1
        className="
          absolute
          left-1/2 -translate-x-1/2
          bottom-16 md:bottom-24 lg:bottom-32
          text-[#C9A227]
          text-4xl sm:text-5xl md:text-6xl lg:text-7xl
          font-bold tracking-widest uppercase
          text-center px-4
          select-none pointer-events-none
        "
      >
        Coming Soon...
      </h1>
    </main>
  );
}
