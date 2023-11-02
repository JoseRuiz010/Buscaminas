export type type_Casilla = "silly" | "normal";
export type status_Casilla = "active" | "desactive";
export class Casilla {
  private positionX: number;
  private positionY: number;
  private type: type_Casilla;
  private isBomba: Boolean;
  private status: status_Casilla;


  constructor(
    positionX: number = 0,
    positionY: number = 0,
    type: type_Casilla = 'normal',
    status: status_Casilla = "desactive",
    isBomba = false,
  ) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.type = type;
    this.isBomba = isBomba,
      this.status = status
  }
  desactivar(): void {
    this.status = 'desactive'
  }
  activar(): void {
    this.status = 'active'
  }
  setBomba(): void {
    this.isBomba = true
  }
}