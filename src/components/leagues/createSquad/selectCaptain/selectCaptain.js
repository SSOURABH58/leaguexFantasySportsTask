import React from "react";
import { connect } from "react-redux";
import styles from "./selectCaptain.module.scss";

export const SelectCaptain = ({
  MySquad,
  MySquadCaptain,
  setMySquadCaptain,
}) => {
  return (
    <div className={styles.selectCaptain}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Team</th>
            <th className={styles.bigTitle}>Player</th>
            <th>Points</th>
            <th>2x</th>
            <th>1.5x</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr className={styles.alternate}> */}
          {MySquad.map((player, i) => (
            <tr
              key={i}
              className={`${i % 2 !== 0 ? styles.alternate : ""} ${
                player.id === MySquadCaptain.captain_id ||
                player.id === MySquadCaptain.vice_captain_id
                  ? styles.disabled
                  : ""
              }`}
            >
              <td className={styles.small}>
                <img src={player.team_logo} alt="" />
              </td>
              <td>{player.team_name}</td>
              <td className={styles.small}>{player.event_total_points}</td>
              {/* <td className={styles.small}>btn</td>
              <td className={styles.small}>btn</td> */}
              <td className={styles.small}>
                {player.id === MySquadCaptain.captain_id ? (
                  <div
                    className={`${styles.btn} ${styles.selected}`}
                    onClick={() =>
                      setMySquadCaptain({ ...MySquadCaptain, captain_id: NaN })
                    }
                  >
                    <p>C</p>
                  </div>
                ) : (
                  <div
                    className={`${styles.btn} ${
                      player.id === MySquadCaptain.vice_captain_id
                        ? styles.btnDisable
                        : ""
                    }`}
                    onClick={() =>
                      setMySquadCaptain({
                        ...MySquadCaptain,
                        captain_id: player.id,
                      })
                    }
                  >
                    <p>C</p>
                  </div>
                )}
              </td>
              <td className={styles.small}>
                {player.id === MySquadCaptain.vice_captain_id ? (
                  <div
                    className={`${styles.btn} ${styles.selected}`}
                    onClick={() =>
                      setMySquadCaptain({
                        ...MySquadCaptain,
                        vice_captain_id: NaN,
                      })
                    }
                  >
                    <p>VC</p>
                  </div>
                ) : (
                  <div
                    className={`${styles.btn} ${
                      player.id === MySquadCaptain.captain_id
                        ? styles.btnDisable
                        : ""
                    }`}
                    onClick={() =>
                      setMySquadCaptain({
                        ...MySquadCaptain,
                        vice_captain_id: player.id,
                      })
                    }
                  >
                    <p>VC</p>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SelectCaptain);
