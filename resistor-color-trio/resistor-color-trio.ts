export const resistorValues = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  grey: 8,
  white: 9,
} as const

type Color = keyof typeof resistorValues

const unitsBaseAmount : [number, string][] = [
  [1_000_000_000, 'giga'],
  [1_000_000, 'mega'],
  [1_000, 'kilo'],
]

// Takes colors and return the amount of [prefix]ohms that match them
export function decodedResistorValue([first, second, third] : Color[]) : string {
  const ohmsAmount = (resistorValues[first] * 10 + resistorValues[second]) * 10 ** resistorValues[third]

  // Get divisor needed to change units from ohms to [prefix]ohms
  const [divisor, prefix] = unitsBaseAmount.find(([ limit ]) => ohmsAmount >= limit) || [1, ''] 

  // Amount returned in [prefix]ohms, e.g. '1000 omhs' now '1 kiloohms'
  return `${ohmsAmount / divisor} ${prefix}ohms` 
}
