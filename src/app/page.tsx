import Image from "next/image";

export default function Home() {
  return (
    <main className="relative h-screen w-screen overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/TheHighEnd.jpeg"
        alt="The High-End Chauffeurs"
        fill
        priority
        className="object-cover brightness-60"
      />

      {/* Overlay text */}
      <div className="absolute inset-0 flex items-end justify-center pb-54">
        <h1 className="translate-x-8 text-[#C9A227] text-5xl md:text-7xl font-bold tracking-widest uppercase">
          Coming Soon...
        </h1>

      </div>
    </main>
  );
}
