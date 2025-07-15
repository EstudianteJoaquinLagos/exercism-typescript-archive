interface Roster { [grade: number]: string[] }
// interp. a collection of student's names grouped by their grades
({ 11: ['Alex', 'María', 'Juliet'] } satisfies Roster)

export class GradeSchool {
  #roster: Roster = {}
  #usedNames: Map<string, number> = new Map()

  public roster(): Roster {
    return structuredClone(this.#roster)
  }

  public add(name: string, grade: number): void {
    /*
     * Add a given student name to a grade group based on given grade
     * If the name already exists inside any other group, delete it before adding it to the new group
    */

    // Delete logic
    if (this.#usedNames.has(name)) {
      const lastGrade = this.#usedNames.get(name) as number
      // If the new grade is the same as before, do nothing
      if (lastGrade === grade) { return } 

      const lastGradeGroup = this.#roster[lastGrade]
      // Delete the name in place
      lastGradeGroup.splice(0, Infinity, ...lastGradeGroup.filter(student => student !== name))
    }

    // Track new name and grade
    this.#usedNames.set(name, grade)

    // Produce a new array inside roster with the given name if no grade group inside for that grade
    if (!this.#roster[grade]) { this.#roster[grade] = [name] }
    else {
    // Add the name to the existing grade group, then sort it
    this.#roster[grade].push(name)
    this.#roster[grade].sort()
    }
  }

  public grade(grade: number): string[] {
    return Array.from(this.#roster[grade] ?? [])
  }
}
