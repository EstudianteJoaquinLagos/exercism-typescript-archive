/** Given a string, produce another encoded under the Atbash Cipher */
export function encode(plainText: string): string {
  const GROUP_SIZE = 5
  const EXCLUDED_CHARS = /\W/g

  const cleanText = plainText.toLowerCase().replace(EXCLUDED_CHARS, '')

  const encoded = transposeText(cleanText)
    // Group the chars in the encoded text in groups of GROUP_SIZE length
    .map((char, i) => i && i % GROUP_SIZE === 0 ? ` ${char}` : char)

  return encoded.join('')
}

/** Given a string encoded under the Atbash Cipher, produce a decoded string */
export function decode(cipherText: string): string {
  const cleanText = cipherText.replace(/\s/g, '')

  return transposeText(cleanText).join('')
}

/** 
 * Given a string, produce a trasposed array of strings
 * where every letter of the original string is its opposite letter
 * @example 
 * // returns ['z', 'y', 'x']
 * trasposeText('abc')
 * @example
 * // returns ['x', '7']
 * transposeText('c7')
 */
function transposeText(text: string): string[] {
  const a = 'a'.charCodeAt(0)
  const z = 'z'.charCodeAt(0)

  const transposed = Array.from(text)
    .map(char => {
      return /[a-z]/.test(char)
        // if char is between a-z produce the transposed opposite of it
        ? String.fromCharCode(a + z - char.charCodeAt(0))
        : char
    })

  return transposed
}
