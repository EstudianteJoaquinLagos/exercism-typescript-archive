// Given coordinates x and y of dart landing in relation to the center of a target, return score
export function score(x: number, y: number): number {
  const radius = Math.sqrt(x**2 + y**2) // radius aka hypotenuse of triangle with cathetus x and y

  if (radius > 10) return 0// Outside target
  if (radius > 5) return 1 // Inside outer ring
  if (radius > 1) return 5 // Inside middle ring
  return 10 // Inside inner ring
}
