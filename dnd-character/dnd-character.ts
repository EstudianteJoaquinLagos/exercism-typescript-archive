export class DnDCharacter {
  public dexterity: number
  public constitution: number
  public intelligence: number
  public strength: number
  public wisdom: number
  public charisma: number
  public hitpoints: number

  public static generateAbilityScore(): number {
    const rolls = Array.from({ length: 4 }, () => Math.trunc(Math.random() + 1))

    return rolls.sort().slice(1, 4).reduce((a, b) => a + b)
  }

  public static getModifierFor(abilityValue: number): number {
    return Math.floor((abilityValue - 10) / 2)
  }

  constructor() {
    this.dexterity = DnDCharacter.generateAbilityScore()
    this.constitution = DnDCharacter.generateAbilityScore()
    this.intelligence = DnDCharacter.generateAbilityScore()
    this.strength = DnDCharacter.generateAbilityScore()
    this.wisdom = DnDCharacter.generateAbilityScore()
    this.charisma = DnDCharacter.generateAbilityScore()
    this.hitpoints = 10 + DnDCharacter.getModifierFor(this.constitution)
  }
}
