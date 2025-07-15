const ORBITAL_PERIODS = {
 mercury: 0.2408467,
 venus: 0.61519726,
 earth: 1.0,
 mars: 1.8808158,
 jupiter: 11.862615,
 saturn: 29.447498,
 uranus: 84.016846,
 neptune: 164.79132,
} as const
type Planet = keyof typeof ORBITAL_PERIODS
const SOLAR_PLANETS = Object.keys(ORBITAL_PERIODS)
const EARTH_YEARS_IN_SECONDS = 31_557_600

// Given a solar system planet and an age in seconds, return age in planet's years
export function age(planet: Planet, seconds: number): number {
  if (!SOLAR_PLANETS.includes(planet)) { throw new Error('Not a planet in our Solar System!') }

  // Calculate age rounded to its second decimal place
  return Math.round((seconds / EARTH_YEARS_IN_SECONDS / ORBITAL_PERIODS[planet]) * 1e2) / 1e2
}
