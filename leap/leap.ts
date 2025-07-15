export function isLeap(year : number) : boolean {
  return year % 100 === 0
    ? year % 400 === 0 // if year is evenly divisible between 100 and 400, then in leap
    : year % 4 === 0 // if year is evenly divisible between 4 but no 100, then is leap
}
