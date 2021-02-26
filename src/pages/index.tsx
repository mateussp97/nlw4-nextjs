import Profile from "../components/Profile";
import ExperienceBar from "./../components/ExperienceBar";
import CompletedChallenges from "../components/CompletedChallenges";
import Countdown from "./../components/Countdown";
import ChallengeBox from "./../components/ChallengeBox";

import { GetServerSideProps } from "next";

//! O CountdownProvider vai ser usado apenas na tela Home, então por isso podemos colocar ele apenas na page index.tsx e não no _app.tsx
import { CountdownProvider } from "../contexts/CountdownContext";

import styles from "../styles/pages/Home.module.css";
import Head from "next/head";
import { ChallengesProvider } from "../contexts/ChallengeContext";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>
        <ExperienceBar />
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

//! Faz a chamada para buscar os dados do método POST nesse método aqui
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengeCompleted } = ctx.req.cookies;

  //! Repassa os dados através das props para dentro do componente, e mostra em tela
  return {
    //! Convertendo de String para Number pois elas foram salvas em String
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengeCompleted: Number(challengeCompleted),
    },
  };
};
