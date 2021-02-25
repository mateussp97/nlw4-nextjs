import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { ChallengesContext } from "./ChallengeContext";

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  active: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

//! Diz que o context segue o formato da interface 'CountdownContextData', assim conseguimos ver o que está disponível nos imports
export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {
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
    //! Reseta o estado do botão
    setHasFineshed(false);
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
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        active,
        startCountdown,
        resetCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
