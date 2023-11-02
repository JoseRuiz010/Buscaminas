import { useEffect, useState } from "react";
import { Casilla, Casilla as ICasilla } from "../models/casilla.models";

type Props = {
  data: ICasilla;
};

function CasillaComponent({ data: casilla }: Props) {
  const [data, setdata] = useState<Casilla>(casilla);
  useEffect(() => {
    setdata(casilla);
  }, [casilla]);

  return (
    <div
      onClick={() => data.activar()}
      className={`w-11 h-11
      ${data.isSilly() ? "border-red-700 border-2" : ""}
         p-2 border border-black  cursor-pointer`}
    >
      {data.status !== "desactive" && !data.isSilly() && (
        <p className="text-center">{`${data.cantidadBomba}`}</p>
      )}
      {data.status !== "desactive" && data.isSilly() && (
        <p className="text-center">{`B`}</p>
      )}
    </div>
  );
}

export default CasillaComponent;
