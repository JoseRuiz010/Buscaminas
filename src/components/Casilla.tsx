import { useEffect, useState } from "react";
import { Casilla, Casilla as ICasilla } from "../models/casilla.models";

type Props = {
  data: ICasilla;
  changeStatusCasilla: (x: number, y: number) => void
};

function CasillaComponent({ data: casilla, changeStatusCasilla }: Props) {
  const [data, setdata] = useState<Casilla>(casilla);
  const [change, setchange] = useState<boolean>(true);
  useEffect(() => {
    setdata(casilla);
  }, [casilla]);


  return (
    <div
      onClick={() => {
        changeStatusCasilla(data.x(), data.y())
        setchange(!change)
      }}
      className={`w-11 h-11
      ${data.isSilly() ? "border-red-700 border-2" : ""}
         p-2 border border-black  cursor-pointer`}>
      {data.status !== "active" && !data.isSilly() && (
        <p className="text-center">{`${data.cantidadBomba}`}</p>
      )}
      {data.status !== "desactive" && data.isSilly() && (
        <p className="text-center">{'🎃'}</p>
      )}
      {/* <p className="text-center">{`${data.x()},${data.y()}`}</p> */}
    </div>
  );
}

export default CasillaComponent;
