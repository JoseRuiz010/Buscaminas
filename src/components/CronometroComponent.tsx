import { useCronometro } from "../hooks/useCronometro";

// Componente que utiliza el gancho
const CronometroComponent: React.FC = () => {
  const { state, iniciarPausar, reiniciar, saveStop } = useCronometro();

  return (
    <div>
      <p>Cronómetro</p>
      <p>
        Tiempo: {state.isRunning ? "En ejecución" : "Pausado"} -{" "}
        {state.currentTime} ms
      </p>
      <button onClick={iniciarPausar}>
        {state.isRunning ? "Pausar" : "Iniciar"}
      </button>
      <button onClick={reiniciar}>Reiniciar</button>
      <button onClick={saveStop}>Guardar</button>
      {JSON.stringify(state)}
    </div>
  );
};

export default CronometroComponent;
