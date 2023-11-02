import { Casilla } from "./casilla.models";

export class Tablero {
  private matriz_tablero: Casilla[][] = [];
  private time: number;
  private cantidad_casilla: number;
  cantidad_bombas: number;

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
    this.agregarCantBomba()
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
  private agregarCantBomba = () => {
    const arrBomba: Casilla[] = [];
    for (let i = 0; i < this.cantidad_casilla; i++) {
      //console.log(this.getTablero()[i]);
      for (let j = 0; j < this.cantidad_casilla; j++) {
        let casilla = this.getTablero()[i][j]
        if (casilla.isSilly()) {
          arrBomba.push(casilla)
        }
      }
    }
    for (let i = 0; i < arrBomba.length; i++) {
      const currentCasilla = arrBomba[i];
      for (let j = -1; j <= 1; j++) {
        for (let k = -1; k <= 1; k++) {
          const valX = currentCasilla.x() + j;
          const valY = currentCasilla.y() + k;
          if ((valX >= 0 && valY >= 0 && (valX < this.cantidad_casilla && valY < this.cantidad_casilla))) {
            this.getTablero()[valX][valY].cantidadBomba = this.getTablero()[valX][valY].cantidadBomba + 1;
          }

        }

      }

    }


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
