import { useState, ReactNode, createContext, useEffect } from "react";
import Cookies from "js-cookie";
import challenges from "../../challenges.json";
import LevelUpModal from "../components/LevelUpModal";

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  levelUp: () => void;
  currentExperience: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  startNewChallenge: () => void;
  activeChallenge: Challenge;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

//! Diz que o context segue o formato da interface 'ChallengesContextData', assim conseguimos ver o que está disponível nos imports
export const ChallengesContext = createContext({} as ChallengesContextData);

//! Passou todas as props tirando children para o objeto 'rest'
export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  //! Faz a verificação que {Se não existir rest.level, aí assume o valor 1}
  const [level, setLevel] = useState(rest.level ?? 1);
  //! Faz a verificação que {Se não existir rest.currentExperience, aí assume o valor 0}
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0
  );
  //! Faz a verificação que {Se não existir rest.challengesCompleted, aí assume o valor 0}
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0
  );
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(null);

  //! Cálculo do level do usuário
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  //! API do própio Browser para aceitar ou não permissões
  //! Quando o useEffect está com [] como parâmetro, quer dizer que ele só irá executar tal função uma única vez por tela
  useEffect(() => {
    Notification.requestPermission();
  }, []);

  //! Irá disparar a função sempre que esses 3 parâmetros forem atualizados
  useEffect(() => {
    //! Salvando as informações com Cookies, cookie permite salvar apenas String, então transformamos o valor de level em String e salvamos level como level. Assim para os demais...
    Cookies.set("level", String(level));
    Cookies.set("currentExperience", String(currentExperience));
    Cookies.set("challengesCompleted", String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function startNewChallenge() {
    //! A variável irá receber um número arredondado(Math.floor) aleatório(Math.random()) entre 0 e o tamanho do Array(challenges.length) 'challenges',
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    //! A variável 'challenge' recebe o valor do Array 'challenges' na posição 'randomChallengeIndex'
    const challenge = challenges[randomChallengeIndex];
    //! O estado 'activeChallenge' recebe o valor da variável 'challenge'
    setActiveChallenge(challenge);

    //! Toca um audio, através dessa API nativa do Browser
    new Audio("/notification.mp3").play();

    //! Verifica se o usuário permitiu a notificação
    if (Notification.permission === "granted") {
      //! Exibi uma notificação com um texto dentro
      new Notification("Novo desafio!", {
        body: `Valendo ${challenge.amount}xp!`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    //! Verificação se activeChallenge é false, retorna vazio
    if (!activeChallenge) {
      return;
    }

    //! Pegando o valor de 'amount' através da desestruturação do objeto 'activeChallenge'
    const { amount } = activeChallenge;
    //! Definindo a variável 'finalExperience' o valor da 'currentExperience' (experiência atual) + 'amount' (experiência do desafio atual)
    let finalExperience = currentExperience + amount;

    //! Verifica se a soma das experiências forem maior que a experiência para o próximo nível
    if (finalExperience >= experienceToNextLevel) {
      //! O que sobra da subtração das experiências
      finalExperience = finalExperience - experienceToNextLevel;
      //! Sobe o usuário de nível
      levelUp();
    }

    //! O valor da experiência atual recebe o resto da subtração acima
    setCurrentExperience(finalExperience);
    //! Coloca null para ActiveChallenge
    setActiveChallenge(null);
    //! Aumenta o número de desafios completos
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        levelUp,
        currentExperience,
        experienceToNextLevel,
        challengesCompleted,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
