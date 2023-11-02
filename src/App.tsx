import { useState } from "react";
import TablaComponent from "./components/Tablero";
import { Tablero } from "./models/tablero.model";

const App = () => {
  const [tablero, settablero] = useState(new Tablero(10, 8, 3));
  return (
    <div className="bg-slate-400 ">
      <h1 className="font-bold text-center text-4xl my-4">Tablero</h1>
      <TablaComponent tablero={tablero} />
    </div>
  );
};
export default App;
