import React, { useState, useEffect } from "react";
import { ITimer } from "../models/interfaces/ITime";

function Cronometro({
  corriendo = false,
  restart = false,
  handleTiempoChange = (props: ITimer) => {},
}) {
  const [segundos, setSegundos] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [horas, setHoras] = useState(0);

  useEffect(() => {
    let intervalId;
    if (restart) reiniciarCronometro();

    if (corriendo) {
      intervalId = setInterval(() => {
        if (segundos === 59) {
          if (minutos === 59) {
            setHoras((horas) => horas + 1);
            setMinutos(0);
          } else {
            setMinutos((minutos) => minutos + 1);
          }
          setSegundos(0);
        } else {
          setSegundos((segundos) => segundos + 1);
        }
      }, 1000);
    } else {
      handleTiempoChange({ horas, minutos, segundos });
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [corriendo, segundos, minutos, horas]);
  const reiniciarCronometro = () => {
    setHoras(0);
    setMinutos(0);
    setSegundos(0);
  };
  return (
    <div>
      <div className="font-bold text-white border border-gray-500 p-2">
        <span>{horas < 10 ? `0${horas}` : horas}</span>:
        <span>{minutos < 10 ? `0${minutos}` : minutos}</span>:
        <span>{segundos < 10 ? `0${segundos}` : segundos}</span>
      </div>
    </div>
  );
}

export default Cronometro;
