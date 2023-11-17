import { useEffect, useState } from "react";
import { GameState, Tablero, state_cronometro } from "../models/tablero.model";
import CasillaComponent from "./Casilla";
import Cronometro from "./Cronometro";
import { CustomSwal } from "./messages/CustomSwal";
import { ITimer } from "../models/interfaces/ITime";

const TablaComponent = () => {
  const [tabla, settabla] = useState(new Tablero(10, 8, 10));
  const [start, setstart] = useState<state_cronometro>(state_cronometro.STOP);
  const [tiempo, setTiempo] = useState<ITimer>({
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  const play = () => setstart(state_cronometro.START);
  const stop = () => setstart(state_cronometro.STOP);
  const restart = () => setstart(state_cronometro.RESTART);

  const changeStatusCasilla = (x: number, y: number, flag: boolean = false) => {
    settabla((prev) => {
      const newTablero = prev.copy(); // Crea una copia del objeto
      if (!flag) {
        newTablero.getTablero()[x][y].activar();
        if (newTablero.casilla_is_Silly(x, y)) {
          newTablero.status_game = GameState.Defeat;
          restart();
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
  const handleTiempoChange = ({ horas, minutos, segundos }: ITimer) => {
    setTiempo({ horas: horas, minutos: minutos, segundos: segundos });
  };

  useEffect(() => {
    CustomSwal(
      {
        title: "Iniciar Juego",
        confirmButtonText: "Iniciar",
      },
      play
    );
  }, []);

  useEffect(() => {
    if (tabla.status_game == GameState.Defeat) {
      CustomSwal(
        {
          title: "Game Over!!",
          icon: "error",
        },
        play
      );
    }
  }, [start]);
  const onAbandonarJuego = () => {
    restart();
    settabla(new Tablero(10, 8, 10));
  };

  return (
    <main className={`bg-red-50 w-min border border-black mx-auto`}>
      {tabla.status_game === GameState.Defeat && <div>FIN</div>}

      <div className="flex justify-between bg-gray-400 p-1 py-4">
        <Cronometro
          handleTiempoChange={handleTiempoChange}
          corriendo={start == state_cronometro.START ? true : false}
          restart={start == state_cronometro.RESTART}
        />
        {start == state_cronometro.START && (
          <button
            className="bg-red-800 p-2 rounded-md text-white"
            onClick={changeStatusTable}
          >
            Abandonar
          </button>
        )}
        {start !== state_cronometro.START && (
          <button
            className="bg-green-800 p-2 rounded-md text-white"
            onClick={play}
          >
            Iniciar
          </button>
        )}
        <div className=" my-auto">
          <label className="">{`08🎃`}</label>
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
