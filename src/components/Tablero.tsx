import { useEffect, useState } from "react";
import { GameState, Tablero } from "../models/tablero.model";
import CasillaComponent from "./Casilla";
import { CustomSwal } from "./messages/CustomSwal";
import { useCronometro } from "../hooks/useCronometro";

const TablaComponent = () => {
  const [tabla, settabla] = useState(new Tablero(10, 5, 2));
  const { state, iniciarPausar, reiniciar } = useCronometro();

  const changeStatusCasilla = (x: number, y: number, flag: boolean = false) => {
    settabla((prev) => {
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
  };
  const changeStatusTable = () => {
    CustomSwal(
      {
        title: "Estas seguro que deseas abandonar el juego?",
        confirmButtonText: "Si",
        showCancelButton: true,
        cancelButtonText: "NO",
      },
      onAbandonarJuego
    );
  };
  const iniciarJuego = () => {
    settabla(new Tablero(1, 5, 1));
    reiniciar();
    iniciarPausar();
  };

  const onAbandonarJuego = () => {
    settabla(new Tablero(1, 5, 1));
    reiniciar();
  };
  useEffect(() => {
    CustomSwal(
      {
        title: "Pulsa iniciar para jugar",
        confirmButtonText: "Iniciar",
      },
      iniciarJuego
    );
  }, []);
  useEffect(() => {
    if (tabla.status_game == GameState.Defeat) {
      iniciarPausar();
      CustomSwal(
        {
          title: "Fin del juego",
          confirmButtonText: "Reintentar",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          icon: "error",
        },
        iniciarJuego,
        onAbandonarJuego
      );
    }
  }, [tabla.status_game]);

  return (
    <main className={`bg-red-50 w-min border border-black mx-auto`}>
      {tabla.status_game === GameState.Defeat && <div>FIN</div>}

      <div className="flex justify-between bg-gray-400 p-1 py-4">
        <span>{state.currentTime}</span>
        {state.isRunning && (
          <button
            className="bg-red-800 p-2 rounded-md text-white"
            onClick={changeStatusTable}
          >
            Abandonar
          </button>
        )}
        {!state.isRunning && (
          <button
            className="bg-green-800 p-2 rounded-md text-white"
            onClick={iniciarJuego}
          >
            Iniciar
          </button>
        )}
        <div className=" my-auto">
          <label className="">{`${tabla.cantidad_bombas}🎃`}</label>
        </div>
      </div>
      {tabla.getTablero().map((ca, i) => (
        <div className="flex" key={i}>
          {ca.map((c, index) => (
            <div key={`${c.y},${index},${c.y}`}>
              <CasillaComponent
                changeStatusCasilla={changeStatusCasilla}
                data={c}
              />
            </div>
          ))}
        </div>
      ))}
    </main>
  );
};

export default TablaComponent;
