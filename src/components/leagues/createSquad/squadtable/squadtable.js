import React from "react";
import styles from "./squadtable.module.scss";
import { MdAddBox } from "react-icons/md";
import { AiFillMinusSquare } from "react-icons/ai";

export default function Squadtable({
  PlayersList,
  addPlayerToSquad,
  MySquad,
  removePlayerFromSquad,
}) {
  return (
    <div className={styles.squadtable}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Team</th>
            <th className={styles.bigTitle}>Player</th>
            <th>In Squads</th>
            <th>Points</th>
            <th>Credits</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* <tr className={styles.alternate}> */}
          {PlayersList.map((player, i) => (
            <tr
              key={i}
              className={`${i % 2 !== 0 ? styles.alternate : ""} ${
                MySquad.includes(player) ? styles.disabled : ""
              }`}
            >
              <td className={styles.small}>
                <img src={player.team_logo} alt="" />
              </td>
              <td>{player.name}</td>
              <td className={styles.small}>0%</td>
              <td className={styles.small}>{player.event_total_points}</td>
              <td className={styles.small}>{player.event_player_credit}</td>
              <td className={styles.small}>
                {MySquad.includes(player) ? (
                  <div
                    className={`${styles.btn} ${styles.removeBtn}`}
                    onClick={() => removePlayerFromSquad(player)}
                  >
                    <AiFillMinusSquare size={25} />
                  </div>
                ) : (
                  <div
                    className={styles.btn}
                    onClick={() => addPlayerToSquad(player)}
                  >
                    <MdAddBox size={25} />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
