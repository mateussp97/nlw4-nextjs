import React, { useContext } from "react";
import styles from "../styles/components/Profile.module.css";
import { ChallengesContext } from "./../contexts/ChallengeContext";

const Profile = () => {
  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/mateussp97.png" alt="Mateus" />
      <div>
        <strong>Mateus de Souza</strong>
        <p>
          <img src="icons/level.svg" alt="Level" /> Level {level}
        </p>
      </div>
    </div>
  );
};

export default Profile;
