import { Casilla } from "./casilla.models";
import { generateRandomNumber } from "../utils/random_numbers";
export enum GameState {
  NotStarted,
  Playing,
  Victory,
  Defeat,
  Paused,
}
export enum state_cronometro {
  START,
  STOP,
  RESTART,
}
export class Tablero {
  public get cantidad_bombas(): number {
    return this._cantidad_bombas;
  }
  public set cantidad_bombas(value: number) {
    this._cantidad_bombas = value;
  }
  public get time(): number {
    return this._time;
  }
  public set time(value: number) {
    this._time = value;
  }
  public get status_game(): GameState {
    return this._status_game;
  }
  public set status_game(value: GameState) {
    this._status_game = value;
  }
  public start_game() {
    this._status_game = GameState.Playing;
  }

  public casilla_is_Silly(x: number, y: number) {
    return this.getTablero()[x][y].isSilly();
  }

  private matriz_tablero: Casilla[][] = [];

  constructor(
    private _time: number,
    private cantidad_casilla: number = 4,
    private _cantidad_bombas: number = 3,
    private _status_game: GameState = GameState.NotStarted
  ) {
    this.init();
  }

  private init(): void {
    this.generateSquareMatrix();
    this.placeBombs();
    this.calculateAdjacentBombCounts();
  }

  private generateSquareMatrix(): void {
    this.matriz_tablero = new Array(this.cantidad_casilla)
      .fill(null)
      .map((_, i) =>
        new Array(this.cantidad_casilla)
          .fill(null)
          .map((_, j) => new Casilla(i, j))
      );
  }

  private placeBombs(): void {
    for (let i = 0; i < this.cantidad_bombas; i++) {
      const x = generateRandomNumber(0, this.cantidad_casilla - 1);
      const y = generateRandomNumber(0, this.cantidad_casilla - 1);
      this.matriz_tablero[x][y].setBomba();
    }
  }

  private calculateAdjacentBombCounts(): void {
    for (let i = 0; i < this.cantidad_casilla; i++) {
      for (let j = 0; j < this.cantidad_casilla; j++) {
        const currentCasilla = this.matriz_tablero[i][j];
        if (currentCasilla.isSilly()) {
          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              const adjacentX = i + dx;
              const adjacentY = j + dy;
              if (
                adjacentX >= 0 &&
                adjacentY >= 0 &&
                adjacentX < this.cantidad_casilla &&
                adjacentY < this.cantidad_casilla
              ) {
                this.matriz_tablero[adjacentX][adjacentY].cantidadBomba++;
              }
            }
          }
        }
      }
    }
  }

  getTablero(): Casilla[][] {
    return this.matriz_tablero;
  }

  public copy(): Tablero {
    const copiedTablero = new Tablero(
      this._time,
      this.cantidad_casilla,
      this.cantidad_bombas,
      this._status_game
    );
    // Copia la matriz de casillas
    copiedTablero.matriz_tablero = this.matriz_tablero;

    return copiedTablero;
  }
}
