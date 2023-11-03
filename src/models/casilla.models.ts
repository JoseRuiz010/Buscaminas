export type type_Casilla = "silly" | "normal";
export type status_Casilla = "active" | "desactive" | "flag";
export type status_Tablero = "active" | "desactive";

export class Casilla {
  private positionX: number;
  private positionY: number;
  private type: type_Casilla;
  private isBomba: boolean;
  status: status_Casilla;
  public cantidadBomba: number;

  constructor(
    positionX: number = 0,
    positionY: number = 0,
    type: type_Casilla = "normal",
    status: status_Casilla = "desactive",
    isBomba = false,
    cantidadBomba: number = 0
  ) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.type = type;
    (this.isBomba = isBomba), (this.status = status);
    this.cantidadBomba = cantidadBomba;
  }
  desactivar(): void {
    this.status = "desactive";
  }
  activar(): void {
    this.status = "active";
  }
  setBomba(): void {
    this.isBomba = true;
  }
  setFlag(): void {
    this.status = "flag"
  }
  x = () => this.positionX;
  y = () => this.positionY;
  tipo = () => this.type;
  isSilly = () => this.isBomba;
  active = () => this.status;
}
