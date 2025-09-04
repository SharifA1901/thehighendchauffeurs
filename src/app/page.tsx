import Image from "next/image";

export default function Home() {
  return (
    <main className="relative h-dvh w-full overflow-hidden bg-black">
      {/* Background image — desktop/tablet */}
      <Image
        src="/images/TheHighEnd-desktop.jpeg"
        alt=""                     // decorative background
        fill
        priority
        sizes="100vw"
        className="hidden md:block object-cover brightness-75 object-center z-0"
      />

      {/* Background image — mobile */}
      <Image
        src="/images/TheHighEnd-mobile.jpeg"
        alt=""                     // decorative background
        fill
        priority
        sizes="100vw"
        className="md:hidden object-cover brightness-75 object-center z-0"
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
          z-10
        "
      >
        Coming Soon...
      </h1>
    </main>
  );
}
