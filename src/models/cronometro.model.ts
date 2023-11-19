import { ITimer } from "./interfaces/ITime";
import { state_cronometro } from "./tablero.model";

export class ClassCronometro {
  private _horas: number;
  public get horas(): number {
    return this._horas;
  }
  public set horas(value: number) {
    this._horas = value;
  }
  private _minutos: number;
  public get minutos(): number {
    return this._minutos;
  }
  public set minutos(value: number) {
    this._minutos = value;
  }
  private _segundos: number;
  public get segundos(): number {
    return this._segundos;
  }
  public set segundos(value: number) {
    this._segundos = value;
  }
  private _status: state_cronometro;
  public get status(): state_cronometro {
    return this._status;
  }
  public set status(value: state_cronometro) {
    this._status = value;
  }
  private _intervalId: any;

  constructor(hora: number, minuto: number, segundos: number) {
    this._horas = hora;
    this._minutos = minuto;
    this._segundos = segundos;
    this._status = state_cronometro.STOP;
  }

  public iniciar = (callback: (props: ITimer) => void) => {
    this.status = state_cronometro.START;

    this._intervalId = setInterval(() => {
      if (this._segundos === 59) {
        if (this._minutos === 59) {
          this._horas++;
          this._minutos = 0;
        } else {
          this._minutos++;
        }
        this._segundos = 0;
      } else {
        this._segundos++;
      }
      callback({
        horas: this._horas,
        minutos: this._minutos,
        segundos: this._segundos,
      });
    }, 1000);
  };
  public parar = () => {
    this.status = state_cronometro.STOP;
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
    this.restart();
  };

  public restart = () => {
    this._horas = 0;
    this._minutos = 0;
    this._segundos = 0;
  };
}
