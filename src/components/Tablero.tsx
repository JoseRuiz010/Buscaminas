import { Tablero } from "../models/tablero.model";
import CasillaComponent from "./Casilla";
interface Props {
  tablero: Tablero;
}
const TablaComponent = ({ tablero }: Props) => {
  return (
    <main className={`flex bg-red-50 w-min p-1 mx-auto`}>
      {tablero.getTablero().map((ca) => (
        <div className="">
          {ca.map((c) => (
            <>
              <CasillaComponent data={c} key={`${c.y},${c.y}`} />
            </>
          ))}
        </div>
      ))}
      {JSON.stringify(tablero.getTablero())}
    </main>
  );
};

export default TablaComponent;
