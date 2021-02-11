export class Status {
  H: string
  A: string
  B: string
  C: string
  D: string
  S: string

  constructor (status) {
    this.H = status.H
    this.A = status.A
    this.B = status.B
    this.C = status.C
    this.D = status.D
    this.S = status.S
  }

  get total (): number {
    return Number(this.H) +
            Number(this.A) +
            Number(this.B) +
            Number(this.C) +
            Number(this.D) +
            Number(this.S)
  }
}
