export class SimpleCipher {
  constructor(public key: string = this.getKey()) {}

  /** 
   * Produce a encoded string under a simple sustitution cipher 
   * given a plain text to encode
   */
  encode(plainText: string): string {
    return this.shiftChars(plainText, 1) // shift right
  }

  /** 
   * Produce a decoded string given a ciphered text before encoded
   * under SimpleCipher.prototype.encode()
   */
  decode(cipherText: string): string {
    return this.shiftChars(cipherText, -1) // shift left
  }
  
  /** 
   * Given a text, produce a string with its characters shifted in the 
   * given direction
   * @param direction can be 1 (right) or -1 (left)
   */
  shiftChars(text: string, direction: 1 | -1): string {
    const A = 'a'.charCodeAt(0)
    const CHARS_TOTAL = 26

    const shiftedText = Array.from(text)
      .map((char, i) => {
        // Distances measured from 'a'
        const keyFragment = this.key[i % this.key.length].charCodeAt(0)
        // The shift has a direction given by its sign (- left, + right)
        const shiftDistance = (keyFragment - A) * direction
        const baseDistance = char.charCodeAt(0) - A
        const totalDistance = baseDistance + shiftDistance

        // Calculates the charCode of the new char based on this formula
        const shiftedCharCode = (CHARS_TOTAL + totalDistance) % CHARS_TOTAL + A

        // Returns the new letter given its charCode
        return String.fromCharCode(shiftedCharCode)
      })

    return shiftedText.join('')
  }

  /** 
   * Produces a string of length 100, where every character is a
   * random letter on the interval [a-z] 
   */
  getKey(): string {
    const A = 'a'.charCodeAt(0)
    const CHARS_TOTAL = 26

    const key = Array.from(
      { length: 100 }, 
      // Produces a random letter between [a-z]
      () => String.fromCharCode(Math.random() * CHARS_TOTAL + A))

    return key.join('')
  }
}
