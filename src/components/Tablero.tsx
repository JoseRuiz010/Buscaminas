import { useState } from "react";
import { Tablero } from "../models/tablero.model";
import CasillaComponent from "./Casilla";

interface Props {
  tablero: Tablero;
}
const TablaComponent = ({ tablero }: Props) => {
  const [tabla, settabla] = useState(tablero);

  const changeStatusCasilla = (x: number, y: number) => {
    // tabla.getTablero()[x][y].activar();
    settabla(prev => {
      prev.getTablero()[x][y].activar()
      return prev
    });
  }
  return (
    <main className={`bg-red-50 w-min p-1 mx-auto`}>
      {tabla.getTablero().map((ca) => (
        <div className="flex">
          {ca.map((c) => (
            <div >
              <CasillaComponent changeStatusCasilla={changeStatusCasilla} data={c} key={`${c.y},${c.y}`} />
            </div>
          ))}

        </div>
      ))}
      {/* {JSON.stringify(tablero.getTablero())} */}
    </main>
  );
};

export default TablaComponent;
