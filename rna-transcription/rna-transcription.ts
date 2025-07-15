const dnaToRna = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
} as const
const dnaNucleotides = Object.keys(dnaToRna)

type Dna = keyof typeof dnaToRna

// Get the RNA complement of a given DNA sequence
export function toRna(sequence: string) {
  const rna = Array.from(sequence).map((nucleotid: string) => 
  {
    // Fail given invalid nucleotid
    if (!dnaNucleotides.includes(nucleotid)) {
      throw new Error('Invalid input DNA.')
    }
    else return dnaToRna[nucleotid as Dna] // Translate DNA into RNA
  })

  return rna.join('')
}
