import React, { useState, useEffect, useContext } from "react";
import { ChallengesContext } from "./../contexts/ChallengeContext";
import styles from "../styles/components/Countdown.module.css";

let countdownTimeout: NodeJS.Timeout;

const Countdown = () => {
  //! Pega através da desestruturação a função 'startNewChallenge' da ContextAPI
  const { startNewChallenge } = useContext(ChallengesContext);

  //! Define o valor inicial no estado time
  const [time, setTime] = useState(0.1 * 60);

  //! O estado verifica se o countdown está ativo ou pausado
  const [active, setActive] = useState(false);

  //! O estado verifica se o countdown finalizou ou não
  const [hasFinished, setHasFineshed] = useState(false);

  //! Definindo o valor de minutos e segundos através do valor do estado 'time'
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

  //! Função que dá o valor false ao estado active, ativando o useEffect
  function resetCountdown() {
    //! Limpa o valor de 1000ms = 1s que esperava para parar o ciclo
    clearTimeout(countdownTimeout);
    //! Define falso o valor do estado active
    setActive(false);
    //! Define o valor inicial de time
    setTime(0.1 * 60);
  }

  //! Executa o useEffect toda vez que active e time mudar
  useEffect(() => {
    //! Se os dois parâmetros forem verdadeiros
    if (active && time > 0) {
      //! setTimeout = usado quando queremos que algo aconteça depois de um tempo
      //! Primeiro parâmetro uma arrowFunction com setTime alterando o estado de time
      //! Segundo parâmetro, o tempo em ms
      //! Esse countdownTimeout foi colocado pois quando estavamos apertando o botão de parar ciclo, ele esperava 1000ms = 1s para parar o ciclo
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
      //! Verifica se active é true e se o tempo decorrido chegou a zero já
    } else if (active && time === 0) {
      //! Define true ao estado 'hasFinished'
      setHasFineshed(true);
      //! Define false ao estado 'active', que faz referência ao countdown
      setActive(false);
      //! Executa a função que foi tirada da ContextAPI
      startNewChallenge();
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
