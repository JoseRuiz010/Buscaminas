import React from "react";
import { Casilla as ICasilla } from "./models/casilla.models";
import Casilla from "./components/Casilla";

type Props = {};

const App = (props: Props) => {
  const cantidad: number = 8;

  function generarMatrizConPosiciones(n: number): ICasilla[][] {
    const matriz: ICasilla[][] = [];

    for (let i = 0; i < n; i++) {
      matriz[i] = new Array(n);

      for (let j = 0; j < n; j++) {
        const cc: ICasilla = {
          positionX: i,
          positionY: j,
          boma_quantity: 0,
          status: "desactive",
          type: "silly",
        };
        matriz[i][j] = cc; // Asigna la posición como una cadena
      }
    }

    return matriz;
  }
  const tablero: ICasilla[][] = generarMatrizConPosiciones(cantidad);

  return (
    <div className="bg-slate-400 ">
      App
      <h1>Tablero</h1>
      <main className={`flex`}>
        {tablero.map((c) => (
          <div className="">
            {c.map((uc) => (
              <div className={``}>
                <Casilla data={uc} key={uc.positionX + uc.positionY} />
              </div>
            ))}
            <hr />
          </div>
        ))}
      </main>
    </div>
  );
};
export default App;
