import React from "react";
import styles from "../styles/components/CompletedChallenges.module.css";

const CompletedChallenges = () => {
  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>
      <span>5</span>
    </div>
  );
};

export default CompletedChallenges;
