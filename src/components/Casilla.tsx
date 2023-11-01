import { useState } from "react";
import { Casilla as ICasilla } from "../models/casilla.models";

type Props = {
  data: ICasilla;
};

function CasillaComponent({ data }: Props) {
  const [dataCasilla, setdataCasilla] = useState<ICasilla>(data);
  const { positionX, positionY, status } = dataCasilla;

  const activeState = () =>
    setdataCasilla({ ...dataCasilla, status: "active" });

  return (
    <div
      onClick={() => activeState()}
      className={`w-11 h-11 ${
        dataCasilla.status == "active"
          ? "bg-red-200 hover:bg-red-300"
          : "bg-gray-200 hover:bg-gray-300"
      } p-2 border border-black  cursor-pointer`}
    >
      <p className="text-center">{`[${positionX},${positionY}]`}</p>
    </div>
  );
}

export default CasillaComponent;
