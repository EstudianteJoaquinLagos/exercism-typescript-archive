export class Matrix {
  readonly rows: number[][]
  readonly columns: number[][]

  constructor(textMatrix: string) {
    /* Produce a Matrix object containg the rows and columns of a given text matrix */
    this.rows = textMatrix.split('\n').map(row => row.split(' ').map(Number)) // Split the text matrix by rows
    this.columns = this.rows[0].map((_, i) => this.rows.map(row => row[i])) // Split the rows into columns, using the first row as a reference
  }
}

