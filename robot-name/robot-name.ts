export class Robot {
  static readonly allNames = Robot.generateAllNames() // List of all names, in order
  private static readonly randomizedNames = Robot.randomizeAllNames(Robot.allNames) // List of all name, in random order
  private static nameBank = Robot.randomizedNames.values() // Iterator for randomly ordered names
  private _name: string | null // Robot instance name

  constructor() {
    this._name = null
  }

  public get name(): string {
    /* Return the instance stored _name, else assign a new name to the robot instance and return it */
    if (this._name) { return this._name } // Short circuit

    // Get next name in iterator
    let randomName = Robot.nameBank.next().value
    // Throw error if iterator is completly consumed
    if (!randomName) { throw new Error('Unable to generate a new name: name bank is empty. Relese names and try again') }

    this._name = randomName
    return randomName
  }

  private static randomizeAllNames(names: string[]): string[] {
    /* Produce a radomly sorted array of names given an array of names */
    const randomNames = Array.from(names)
    const getRandomNumber = () => Math.floor(Math.random() * names.length)

    randomNames.forEach((name, i) => {
      const random = getRandomNumber()
      // Switch names of index place with random place, using tmp to store random place name while switching
      const tmp = randomNames[random]
      randomNames[random] = name
      randomNames[i] = tmp
    })

    return randomNames
  }

  private static generateAllNames(): string[] {
    /* Produce a array of all the posible combinations of names that follow /[A-Z][A-Z][000-999]/, without repetitions */
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numberRange = Array.from({ length: 1000 }).fill(0).map((_, i) => i) // Range from 0 to 999

    const allNames = []
    for (const firstChar of alphabet) {
      for (const secondChar of alphabet) {
        for (const number of numberRange) {
          allNames.push(`${firstChar}${secondChar}${number.toString().padStart(3, '0')}`)
        }
      }
    }

    return allNames
  }

  public resetName(): void {
    /* Produce a new name for this Robot instance */
    this._name = null // Necessary to disable short circuit of the getter associated to name
    this._name = this.name
  }

  public static releaseNames(): void {
    /* Produce a new randomly sorted name bank for the static Robot class */
    Robot.nameBank = Robot.randomizedNames.values()
  }
}
