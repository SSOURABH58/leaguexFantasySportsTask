import React from "react";
import styles from "./squad.module.scss";

export default function Squad({ squad, index }) {
  return (
    <div className={styles.squad}>
      <p>{`Squad ${index + 1}`}</p>
      <div className={styles.gridcont}>
        <div>
          {squad.squad.filter((player) => player.id === squad.captain)[0].name}
          <p className={styles.playerTitle}>C</p>
        </div>
        <div>
          {
            squad.squad.filter((player) => player.id === squad.vice_captain)[0]
              .name
          }
          <p className={styles.playerTitle}>VC</p>
        </div>
        <p className={styles.btns}>Clone</p>
        <p className={styles.btns}>Edit</p>
      </div>
    </div>
  );
}
