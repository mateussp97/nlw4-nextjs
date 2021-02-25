import { useState, ReactNode, createContext } from "react";
import challenges from "../../challenges.json";

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
}

interface ChallengesProviderProps {
  children: ReactNode;
}

//! Diz que o context segue o formato da interface 'ChallengesContextData', assim conseguimos ver o que está disponível nos imports
export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  //! Cálculo do level do usuário
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    //! A variável irá receber um número arredondado(Math.floor) aleatório(Math.random()) entre 0 e o tamanho do Array(challenges.length) 'challenges',
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    //! A variável 'challenge' recebe o valor do Array 'challenges' na posição 'randomChallengeIndex'
    const challenge = challenges[randomChallengeIndex];
    //! O estado 'activeChallenge' recebe o valor da variável 'challenge'
    setActiveChallenge(challenge);
  }

  function resetChallenge() {
    setActiveChallenge(null);
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
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
