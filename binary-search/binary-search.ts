/** Perform a binary search for a given number in a sorted array of numbers 
 * Return the index of the number, or an error if number is not found.
 */
export function find(haystack: number[], needle: number): number | never {
  let top = haystack.length - 1
  let bottom = 0
  let i = Math.round(top / 2)

  while (top >= bottom) {
    if (needle === haystack[i]) { return i }
    if (needle > haystack[i]) { bottom = i + 1 } 
    else { top = i - 1 }

    i = Math.round((top + bottom) / 2)
  }

  throw new Error('Value not in array')
}
