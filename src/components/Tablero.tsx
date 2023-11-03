import { useEffect, useState } from "react";
import { GameState, Tablero } from "../models/tablero.model";
import CasillaComponent from "./Casilla";

const TablaComponent = () => {

  const [tabla, settabla] = useState(new Tablero(10, 8, 10));

  const changeStatusCasilla = (x: number, y: number, flag: boolean = false) => {
    settabla(prev => {
      const newTablero = prev.copy(); // Crea una copia del objeto
      if (!flag) {
        newTablero.getTablero()[x][y].activar();
        if (newTablero.casilla_is_Silly(x, y)) {
          newTablero.status_game = GameState.Defeat;
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
      }
    }, 5000);
  }, [tabla])

  return (
    <main className={`bg-red-50 w-min p-1 mx-auto`}>
      {
        tabla.status_game === GameState.Defeat && <div>FIN</div>
      }
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
