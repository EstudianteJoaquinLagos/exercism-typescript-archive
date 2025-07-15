export class Rational {
  #numerator: number
  #denominator: number

  constructor(numerator: number, denominator: number) {
    this.#numerator = numerator
    this.#denominator = denominator
  }

  get numerator() { return this.#numerator }
  get denominator() { return this.#denominator }

  /** Add a rational number to a rational number */
  add(rational: Rational): Rational {
    const { numerator, denominator } = rational

    return new Rational(
      this.#numerator * denominator + numerator * this.#denominator,
      this.#denominator * denominator
    ).reduce()
  }

  /** Substract a rational number to a rational number*/
  sub(rational: Rational): Rational {
    const { numerator, denominator } = rational

    return new Rational(
      this.#numerator * denominator - this.#denominator * numerator,
      this.#denominator * denominator
    ).reduce()
  }

  /** Multiply a rational by another rational */
  mul(rational: Rational): Rational {
    const { numerator, denominator } = rational

    return new Rational(
      this.numerator * numerator,
      this.denominator * denominator
    ).reduce()
  }

  /** Divide a rational by another rational */
  div(rational: Rational): Rational {
    const { numerator, denominator } = rational

    return new Rational(
      this.#numerator * denominator,
      numerator * this.#denominator
    ).reduce()
  }

  /** Produces an absolute rational given a rational */
  abs(): Rational {
    return new Rational(
      Math.abs(this.#numerator),
      Math.abs(this.#denominator)
    ).reduce()
  }

  /** Exponentiate a rational to an integer power*/
  exprational(exp: number): Rational {
    // Any exponentiation by 0 produces 1
    if (exp === 0) { return new Rational(1, 1) }

    if (exp > 0) {
      return new Rational(
        Math.pow(this.#numerator, exp), 
        Math.pow(this.#denominator, exp)
      ).reduce()
    }

    // If exponent is less than 0
    exp = Math.abs(exp)

    return new Rational(
      Math.pow(this.#denominator, exp),
      Math.pow(this.#numerator, exp)
    ).reduce()
  }

  /** Produces a real number as the result of applaying
   * a nth root to a real number */
  private root(real: number, root: number): number {
    return Math.pow(real, 1/root)
  }

  /** Exponentiate a real to a rational power, returning a real */
  expreal(real: number): number {
    return this.root(Math.pow(real, this.#numerator), this.#denominator)
  }

  /** Produces the absolute great common divisor between two numbers */
  private agcd(a: number, b: number): number {
    return b === 0
      ? Math.abs(a)
      : this.agcd(b, a % b)
  }

  /** Produces the reduced form of this Rational */
  reduce(): Rational {
    const divisor = this.agcd(this.#numerator, this.#denominator)
    const newNumerator = this.#numerator / divisor
    const newDenominator = this.#denominator / divisor

    this.#numerator = this.#denominator < 0
      ? (this.#denominator = -newDenominator, -newNumerator)
      : (this.#denominator = newDenominator, newNumerator)

    return this
  }
}
