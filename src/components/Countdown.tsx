import React, { useContext } from "react";
import styles from "../styles/components/Countdown.module.css";
import { CountdownContext } from "./../contexts/CountdownContext";

const Countdown = () => {
  //! Importa as funcionalidades da ContextAPI através da desestruturação
  const {
    minutes,
    seconds,
    hasFinished,
    active,
    resetCountdown,
    startCountdown,
  } = useContext(CountdownContext);

  //! Tranforma minutes em String
  //! Verifica sem tem dois caracteres, se não tem preenche o vazio com 0
  //! E devolve um array com duas Strings
  //! Através da desestruturação a gente pega o lado esquerdo e o lado direito do minuto
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Ciclo encerrado
        </button>
      ) : (
        <>
          {active ? (
            <button
              onClick={resetCountdown}
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button
              onClick={startCountdown}
              type="button"
              className={styles.countdownButton}
            >
              Iniciar ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Countdown;
