import React, { useState, useEffect } from "react";
import styles from "./matchCard.module.scss";
import { GiTShirt } from "react-icons/gi";

export default function MatchCard({ match, index }) {
  const {
    event_name,
    t1_short_name,
    t2_short_name,
    t1_image,
    t2_image,
    match_date,
  } = match;

  const [timeLeft, settimeLeft] = useState("00:00:00");

  useEffect(() => {
    const timer = setInterval(() => {
      const timereaming = new Date(match_date).getTime() - new Date();
      const timeformate = String(new Date(timereaming)).split(" ")[4];
      return settimeLeft(timeformate);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [settimeLeft, match_date]);

  return (
    <div
      className={`${styles.matchCard} ${
        index === 0 ? styles.matchCardGreen : ""
      }`}
    >
      <div className={styles.teams}>
        <div className={styles.teamImages}>
          {t1_image ? <img src={t1_image} alt="" /> : <GiTShirt />}
          <p>{t1_short_name}</p>
        </div>
        <p>VS</p>
        <div className={styles.teamImages}>
          {t2_image ? <img src={t2_image} alt="" /> : <GiTShirt />}
          <p>{t2_short_name}</p>
        </div>
      </div>
      <p>{event_name}</p>
      <div
        className={`${styles.timer} ${index === 0 ? styles.timerGreen : ""}`}
      >
        {/* {console.log(new Date(match_date).getTime() - new Date())} */}
        <p>{timeLeft}</p>
      </div>
    </div>
  );
}
