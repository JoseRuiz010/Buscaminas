import { Casilla } from "./casilla.models";

export class Tablero {

  private matriz_tablero: Casilla[][] = [];
  private time: number;
  private cantidad_casilla: number;
  private cantidad_bombas: number;

  constructor(time: number, cantidad_casilla: number = 4, cantidad_bombas: number = 3) {
    this.time = time;
    this.cantidad_casilla = cantidad_casilla;
    this.cantidad_bombas = cantidad_bombas;
    this.generarTablero()
  }

  public generarTablero(): void {
    const tableroCurrent: Casilla[][] = []
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        tableroCurrent[j][i] = new Casilla();
      }
    }
  }

  getTablero = (): Casilla[][] => this.matriz_tablero


}