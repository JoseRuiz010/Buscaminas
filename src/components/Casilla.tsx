import { useEffect, useState } from "react";
import { Casilla, Casilla as ICasilla } from "../models/casilla.models";

type Props = {
  data: ICasilla;
  changeStatusCasilla: (x: number, y: number, flag?: boolean) => void;
};

function CasillaComponent({ data: casilla, changeStatusCasilla }: Props) {
  const [data, setdata] = useState<Casilla>(casilla);

  useEffect(() => {
    setdata(casilla);
  }, [casilla]);

  const onChangeStatusCasilla = () => changeStatusCasilla(data.x(), data.y());
  const onChangeStatusCasilla_flag = (e: any) => {
    e.preventDefault();
    changeStatusCasilla(data.x(), data.y(), true);
  };

  return (
    <div
      onClick={onChangeStatusCasilla}
      onContextMenu={onChangeStatusCasilla_flag}
      className={`w-11 h-11
      ${
        data.status == "desactive" ? "shadow-gray-700 shadow-md" : "shadow-none"
      }
      ${data.isSilly() ? "border-red-700 border-2 " : ""}
         p-2 border border-black  cursor-pointer`}
    >
      {data.status === "active" && !data.isSilly() && (
        <p className="text-center">{`${data.cantidadBomba}`}</p>
      )}
      {data.status === "active" && data.isSilly() && (
        <p className="text-center">{"🎃"}</p>
      )}
      {data.status === "flag" && <p className="text-center">{"🚩"}</p>}
      {/* <p className="text-center">{`${data.x()},${data.y()}`}</p> */}
    </div>
  );
}

export default CasillaComponent;
