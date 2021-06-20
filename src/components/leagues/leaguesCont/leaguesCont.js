import React, { useEffect } from "react";
import { AiTwotoneTrophy } from "react-icons/ai";
import { RiTeamFill } from "react-icons/ri";
import styles from "./leaguesCont.module.scss";
import Leagu from "./Leagu/Leagu";
// import { Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Squad from "./squad/squad";

export default function LeaguesCont({
  Leagues,
  id,
  Squads,
  getSquads,
  resMySquad,
}) {
  useEffect(() => {
    getSquads(id);
  }, [getSquads, id, resMySquad]);
  return (
    <div className={styles.leaguesCont}>
      {/* <Router> */}
      <Switch>
        <Route path="/:id" exact>
          <div className={styles.listCont}>
            {Leagues.map((league, i) => (
              <Leagu key={i} league={league} />
            ))}
          </div>
        </Route>
        {/* <Route path={`/${id}/Squads`} exact> */}
        <Route path="/:id/Squads" exact>
          <p className={styles.squadCount}>{`My Squads ${Squads.length}/10`}</p>
          <div className={styles.listCont}>
            <div className={styles.squads}>
              {Squads.map((squad, i) => (
                <Squad squad={squad} key={i} index={i} />
              ))}

              {Squads.length < 10 ? (
                <Link to={`/${id}/CreateSquad/BAT`}>
                  <div className={styles.newSquadBtn}>Create new Squad</div>
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </Route>
      </Switch>
      {/* </Router> */}
      <div className={styles.bottummenue}>
        <Link to={`/${id}`}>
          <div className={styles.iconcont}>
            <AiTwotoneTrophy size={30} />
            <p>Leagues</p>
          </div>
        </Link>
        <Link to={`/${id}/Squads`}>
          <div className={styles.iconcont}>
            <RiTeamFill size={30} />
            <p>My Squads</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
