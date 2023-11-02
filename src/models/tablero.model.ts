import { Casilla } from "./casilla.models";

export class Tablero {
  private matriz_tablero: Casilla[][] = [];
  private time: number;
  private cantidad_casilla: number;
  private cantidad_bombas: number;

  constructor(
    time: number,
    cantidad_casilla: number = 4,
    cantidad_bombas: number = 3
  ) {
    this.time = time;
    this.cantidad_casilla = cantidad_casilla;
    this.cantidad_bombas = cantidad_bombas;
    this.matriz_tablero = this.generarMatrizCuadrada();
    this.cargarBombas();
  }

  private generarMatrizCuadrada(): Casilla[][] {
    const matriz: Casilla[][] = [];

    for (let i = 0; i < this.cantidad_casilla; i++) {
      matriz[i] = new Array(this.cantidad_casilla);

      for (let j = 0; j < this.cantidad_casilla; j++) {
        matriz[i][j] = new Casilla(i, j);
      }
    }

    return matriz;
  }

  private cargarBombas = () => {
    for (let i = 0; i < this.cantidad_bombas; i++) {
      const x = Math.floor(Math.random() * 4);
      const y = Math.floor(Math.random() * 4);
      this.matriz_tablero[x][y].setBomba();
    }
  };

  getTablero = (): Casilla[][] => this.matriz_tablero;
}
