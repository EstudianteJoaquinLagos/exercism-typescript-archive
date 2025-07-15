/** interp. steps available for a secret handshake */
type Step = 
  | 'wink'
  | 'double blink' 
  | 'close your eyes' 
  | 'jump' 

/** Produce an array of Steps for a secret handshake given a number between
 * 1 and 31
 *
 * The steps are chosen by looking at the rightmost five digits of the number
 * once it's been converted to binary, starting at the right-most digit
 * and moving left.
 * If the fifth digit to the left is '1', reverse the order of steps
 */
export function commands(digit: number): Step[] {
  const availableSteps: Map<number, Step> = new Map([
    [0b00001, 'wink'],
    [0b00010, 'double blink'], // e.g. binary 00010 represents 'double blink'
    [0b00100, 'close your eyes'],
    [0b01000, 'jump'],
  ])
  const handshake: Step[] = []

  for (const [flag, step] of availableSteps) {
    if (digit & flag) { // if digit in binary has '1' in same place as flag
      handshake.push(step)
    }
  }

  // If last digit is '1', reverse order of steps
  return digit & 0b10000
    ? handshake.reverse()
    : handshake
}
