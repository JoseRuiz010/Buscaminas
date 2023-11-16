import { useEffect, useState } from "react";
import { GameState, Tablero, state_cronometro } from "../models/tablero.model";
import CasillaComponent from "./Casilla";
import Cronometro from "./Cronometro";

const TablaComponent = () => {
  const [tabla, settabla] = useState(new Tablero(10, 8, 10));
  const [start, setstart] = useState<state_cronometro>(state_cronometro.STOP)

  const play = () => setstart(state_cronometro.START);
  const stop = () => setstart(state_cronometro.STOP);
  const restart = () => setstart(state_cronometro.RESTART);
  const changeStatusCasilla = (x: number, y: number, flag: boolean = false) => {
    settabla(prev => {
      const newTablero = prev.copy(); // Crea una copia del objeto
      if (!flag) {
        newTablero.getTablero()[x][y].activar();
        if (newTablero.casilla_is_Silly(x, y)) {
          newTablero.status_game = GameState.Defeat;
          restart()
        }
      } else {
        newTablero.getTablero()[x][y].setFlag();
      }
      return newTablero;
    });
  }
  useEffect(() => {
    setTimeout(() => {
      if (tabla.status_game === GameState.Defeat) {
        settabla(new Tablero(10, 8, 10))
        play()
      }
    }, 5000);
  }, [tabla])

  return (
    <main className={`bg-red-50 w-min p-1 mx-auto`}>
      {
        tabla.status_game === GameState.Defeat && <div>FIN</div>
      }
      <button onClick={play}>Iniciar</button>
      <Cronometro corriendo={start == state_cronometro.START ? true : false} restart={start == state_cronometro.RESTART} />
      {tabla.getTablero().map((ca, i) => (
        <div className="flex" key={i}>
          {ca.map((c, index) => (
            <div key={`${c.y},${index},${c.y}`} >
              <CasillaComponent changeStatusCasilla={changeStatusCasilla} data={c} />
            </div>
          ))}
        </div>
      ))}
    </main>
  );
};

export default TablaComponent;
