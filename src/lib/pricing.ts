export type VehicleType = "business" | "first" | "mpv";

const pricing = {
  business: { base: 25, perMile: 2.2 },
  first: { base: 40, perMile: 3.2 },
  mpv: { base: 35, perMile: 2.8 },
};

export function calculateFare(
  distanceMiles: number,
  durationMinutes: number,
  vehicle: VehicleType
) {
  const config = pricing[vehicle];

  let fare =
    config.base +
    distanceMiles * config.perMile +
    durationMinutes * 0.3;

  const hour = new Date().getHours();
  if (hour >= 22 || hour <= 5) {
    fare *= 1.15;
  }

  const min = Math.round(fare * 0.95);
  const max = Math.round(fare * 1.05);

  return { min, max };
}