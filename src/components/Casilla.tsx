import { useState } from "react";
import { Casilla as ICasilla } from "../models/casilla.models";

type Props = {
  data: ICasilla;
};

function CasillaComponent({ data }: Props) {

  return (
    <div
      onClick={() => { }}
      className={`w-11 h-11
       
         p-2 border border-black  cursor-pointer`}
    >
      {/* <p className={`text-center ${type == "silly" ? "border-2 border-red-400" : ""}`}>{`${positionX},${positionY}`}</p> */}
    </div>
  );
}

export default CasillaComponent;
