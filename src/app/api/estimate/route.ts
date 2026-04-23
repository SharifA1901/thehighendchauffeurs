import { NextRequest } from "next/server";
import { calculateFare } from "@/lib/pricing";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pickup, destination, vehicle } = body;

    if (!pickup || !destination) {
      return Response.json(
        { ok: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    const distanceMiles = Math.random() * 20 + 5;
    const durationMinutes = distanceMiles * 3;

    const fare = calculateFare(distanceMiles, durationMinutes, vehicle);

    return Response.json({
      ok: true,
      distanceMiles: distanceMiles.toFixed(1),
      durationMinutes: Math.round(durationMinutes),
      fare,
    });
  } catch {
    return Response.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}