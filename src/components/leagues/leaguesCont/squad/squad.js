import React from "react";
import styles from "./squad.module.scss";

export default function Squad() {
  return (
    <div className={styles.squad}>
      <p>Squad 1</p>
      <div className={styles.gridcont}>
        <p>
          capton<span>C</span>
        </p>
        <p>
          vcapton<span>VC</span>
        </p>
        <p className={styles.btns}>Clone</p>
        <p className={styles.btns}>Edit</p>
      </div>
    </div>
  );
}
