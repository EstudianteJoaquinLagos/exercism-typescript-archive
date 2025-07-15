export class Clock {
  private readonly MINS_IN_HOUR = 60
  private readonly MINS_IN_DAY = 1440

  private internalTime: number
  /* Interval between 0 and MINS_IN_DAY 
   * Interp. current minute in a day
   * 0 - first minute of day (clock started anew)
   * MINS_IN_DAY - last minute of day
   */

  constructor(hour: number, minutes = 0)  {
    const rawMinutes = hour * this.MINS_IN_HOUR + minutes
    this.internalTime = this.getInternalTime(rawMinutes)
  }

  /** Produce a string of shape `HH:mm` for current clock time */
  public toString(): string {
    const hour = Math.floor(this.internalTime / this.MINS_IN_HOUR)
    const minute = this.internalTime - (hour * this.MINS_IN_HOUR)

    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
  }

  /** Add given minutes to clock instance */
  public plus(minutes: number): Clock {
    const rawMinutes = this.internalTime + minutes
    this.internalTime = this.getInternalTime(rawMinutes)

    return this
  }

  /** Remove given minutes from clock instance */
  public minus(minutes: number): Clock {
    const rawMinutes = this.internalTime - minutes
    this.internalTime = this.getInternalTime(rawMinutes)

    return this  
  }

  /** Produce true if given clock instance has same time as current clock instance */
  public equals(other: Clock): boolean {
    return this.internalTime === other.internalTime
  }

  private getInternalTime(rawMinutes: number): number {
    return (rawMinutes % this.MINS_IN_DAY + this.MINS_IN_DAY) % this.MINS_IN_DAY
  }
}
