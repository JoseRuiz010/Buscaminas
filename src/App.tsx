
import { Tablero } from "./models/tablero.model";

const App = () => {

  const tablero = new Tablero(10, 4, 3);

  return (
    <div className="bg-slate-400 ">
      <h1 className="font-bold text-center text-4xl my-4">Tablero</h1>
      <main className={`flex bg-red-50 w-min p-1 mx-auto`}>
        {tablero.getTablero().map((c) => (
          <div className="">
            {c.map((uc) => (
              <div className={``}>

                {/* <Casilla data={uc} key={uc.positionX + uc.positionY} /> */}
              </div>
            ))}
            <hr />
            {JSON.stringify(tablero.getTablero())}
          </div>
        ))}
      </main>
    </div>
  );
};
export default App;
