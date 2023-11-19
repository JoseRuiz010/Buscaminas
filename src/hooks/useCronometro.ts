import React, { useState, useEffect } from "react";

interface CronometroState {
  segundos: number;
  minutos: number;
  horas: number;
  dias: number;
  pausedTime: number;
  isRunning: boolean;
  currentTime: string;
  stops: string[];
}

export const useCronometro = () => {
  const [state, setState] = useState<CronometroState>({
    segundos: 0,
    minutos: 0,
    horas: 0,
    dias: 0,
    pausedTime: 0,
    isRunning: false,
    currentTime: `00:00:00`,
    stops: [],
  });

  useEffect(() => {
    let intervalId: number;
    if (state.isRunning) {
      intervalId = setInterval(() => {
        setState((prevState) => {
          if (prevState.segundos < 59) {
            return {
              ...prevState,
              segundos: state.segundos + 1,
              currentTime: `${String(state.horas).padStart(
                2,
                "0"
              )}:${state.minutos.toString().padStart(2, "0")}:${state.segundos
                .toString()
                .padStart(2, "0")}`,
            };
          } else {
            if (prevState.minutos < 59) {
              return {
                ...prevState,
                segundos: 0,
                minutos: state.minutos + 1,
                currentTime: `${String(state.horas).padStart(
                  2,
                  "0"
                )}:${state.minutos.toString().padStart(2, "0")}:${state.segundos
                  .toString()
                  .padStart(2, "0")}`,
              };
            } else {
              return {
                ...prevState,
                segundos: 0,
                minutos: 0,
                horas: state.horas + 1,
                currentTime: `${state.horas
                  .toString()
                  .padStart(2, "0")}:${state.minutos
                  .toString()
                  .padStart(2, "0")}:${state.segundos
                  .toString()
                  .padStart(2, "0")}`,
              };
            }
          }
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [
    state.isRunning,
    state.segundos,
    state.minutos,
    state.horas,
    state.currentTime,
  ]);

  const iniciarPausar = () => {
    setState((prevState) => ({ ...prevState, isRunning: !state.isRunning }));
  };

  const reiniciar = () => {
    setState({
      dias: 0,
      horas: 0,
      minutos: 0,
      segundos: 0,
      pausedTime: 0,
      isRunning: false,
      currentTime: `00:00:00`,
      stops: [],
    });
  };
  const saveStop = () => {
    setState((prev) => ({
      ...prev,
      stops: [
        ...prev.stops,
        `${state.horas.toString().padStart(2, "0")}:${state.minutos
          .toString()
          .padStart(2, "0")}:${state.segundos.toString().padStart(2, "0")}`,
      ],
    }));
  };

  return { state, iniciarPausar, reiniciar, saveStop };
};
