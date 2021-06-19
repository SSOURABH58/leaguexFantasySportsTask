import React from "react";
import { AiTwotoneTrophy } from "react-icons/ai";
import { GiTwoCoins } from "react-icons/gi";
import styles from "./Leagu.module.scss";

export default function Leagu({ league }) {
  const {
    winning_amount,
    max_limit,
    entry_fee,
    winning_criteria,
    winning_amount_splitup,
    id,
  } = league;
  return (
    <div className={styles.leagu}>
      <p className={styles.winprice}>{`Win ₹ ${winning_amount}`}</p>
      <p
        className={styles.slots}
      >{`${winning_amount_splitup.totalWinners}/${max_limit} Slots Left`}</p>
      <div className={styles.iconcont}>
        <AiTwotoneTrophy size={30} />
        <p>{winning_criteria}</p>
      </div>
      <div className={styles.iconcont}>
        <GiTwoCoins size={30} />
        <p>{entry_fee}</p>
      </div>
    </div>
  );
}
