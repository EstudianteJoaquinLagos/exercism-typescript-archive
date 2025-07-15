// Given a string, return true if it's a pangram, else false
export function isPangram(pangram: string): boolean {
  const notAlphabetCharacters = /[^a-z]/g
  const sanitazedPangram = new Set(pangram.toLowerCase().replace(notAlphabetCharacters, ''))

  // Check that sanitazedPangram is in fact a pangram (i.e. contains all 26 alphabet letters)
  return sanitazedPangram.size === 26
}
