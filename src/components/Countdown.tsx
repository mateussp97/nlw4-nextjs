import React, { useState, useEffect } from "react";
import styles from "../styles/components/Countdown.module.css";

const Countdown = () => {
  //! Define o valor inicial no estado time
  const [time, setTime] = useState(25 * 60);

  //! O estado verifica se o countdown está ativo ou pausado
  const [active, setActive] = useState(false);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  //! Tranforma minutes em String
  //! Verifica sem tem dois caracteres, se não tem preenche o vazio com 0
  //! E devolve um array com duas Strings
  //! Através da desestruturação a gente pega o lado esquerdo e o lado direito do minuto
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  //! Função que dá o valor true ao estado active, ativando o useEffect
  function startCountdown() {
    setActive(true);
  }

  //! Executa o useEffect toda vez que active e time mudar
  useEffect(() => {
    //! Se os dois parâmetros forem verdadeiros
    if (active && time > 0) {
      //! setTimeout = usado quando queremos que algo aconteça depois de um tempo
      //! Primeiro parâmetro uma arrowFunction com setTime alterando o estado de time
      //! Segundo parâmetro, o tempo em ms
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
  }, [active, time]);

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
      <button
        onClick={startCountdown}
        type="button"
        className={styles.countdownButton}
      >
        Iniciar um ciclo
      </button>
    </div>
  );
};

export default Countdown;
