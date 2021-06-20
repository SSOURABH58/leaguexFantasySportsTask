import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import styles from "./createSquad.module.scss";
import Squadtable from "./squadtable/squadtable";
import SelectCaptain from "./selectCaptain/selectCaptain";
import {
  getPlayers,
  setSquad,
  getSquads,
} from "../../../redux/duck/fantasyCricket";
import { useHistory, Switch, Route, Link, useLocation } from "react-router-dom";

export const CreateSquad = ({
  getPlayers,
  Players,
  matchId,
  setSquad,
  resMySquad,
  getSquads,
}) => {
  const history = useHistory();
  const location = useLocation();
  const [PlayerTypes, setPlayerTypes] = useState({
    bat: [],
    wk: [],
    ar: [],
    bowl: [],
  });
  const [MySquad, setMySquad] = useState([]);
  const [MySquadCaptain, setMySquadCaptain] = useState({});
  const [Credit, setCredit] = useState(100);
  const [Teams, setTeams] = useState({ A: [{}], B: [{}] });

  const addPlayerToSquad = (player) => {
    const bat = MySquad.filter((player) => player.role === "Batsman").length;
    const wk = MySquad.filter(
      (player) => player.role === "Wicket-Keeper"
    ).length;
    const ar = MySquad.filter((player) => player.role === "All-Rounder").length;
    const bowl = MySquad.filter((player) => player.role === "Bowler").length;
    if (MySquad.length <= 11 && Credit - player.event_player_credit >= 0) {
      switch (player.role) {
        case "Batsman":
          if (
            bat >= 7 ||
            MySquad.length - bowl >= 8 ||
            MySquad.length - wk >= 10
          )
            return;
          break;
        case "Wicket-Keeper":
          if (
            wk >= 5 ||
            MySquad.length - bowl >= 8 ||
            MySquad.length - bat >= 8
          )
            return;
          break;
        case "All-Rounder":
          if (
            ar >= 4 ||
            MySquad.length - bowl >= 8 ||
            MySquad.length - wk >= 10 ||
            MySquad.length - bat >= 8
          )
            return;
          break;
        case "Bowler":
          if (
            bowl >= 7 ||
            MySquad.length - bat >= 9 ||
            MySquad.length - wk >= 10
          )
            return;
          break;

        default:
          return;
        // break;
      }
      setCredit(Credit - player.event_player_credit);
      setMySquad([...MySquad, player]);
    }
  };

  const removePlayerFromSquad = (player) => {
    setMySquad(MySquad.filter((Player) => Player !== player));
    setCredit(Credit + player.event_player_credit);
  };

  const addMySquad = () => {
    const squad = {
      squad: MySquad.map((player) => player.id),
      ...MySquadCaptain,
      match_id: matchId,
      event_id: 1,
    };
    setSquad(squad);
    // console.log("ddddddddddd");
  };

  useEffect(() => {
    // console.log(location);
    // if (location.pathname === `/${matchId}/CreateSquad/selectCaptain`) {
    if (resMySquad) {
      history.push(`/${matchId}/Squads`);
    }
  }, [history, matchId, resMySquad, location]);

  useEffect(() => {
    getPlayers();
  }, [getPlayers]);
  useEffect(() => {
    setPlayerTypes({
      bat: Players.filter((player) => player.role === "Batsman"),
      wk: Players.filter((player) => player.role === "Wicket-Keeper"),
      ar: Players.filter((player) => player.role === "All-Rounder"),
      bowl: Players.filter((player) => player.role === "Bowler"),
    });
    setTeams({
      A: Players.filter((player) => player.team_name === Players[0].team_name),
      B: Players.filter((player) => player.team_name !== Players[0].team_name),
    });
  }, [setPlayerTypes, setTeams, Players]);
  return (
    <div className={styles.createSquad}>
      <Switch>
        <Route path="/:id/CreateSquad/selectCaptain">
          <SelectCaptain
            MySquad={MySquad}
            MySquadCaptain={MySquadCaptain}
            setMySquadCaptain={setMySquadCaptain}
          />
          <div className={styles.doneBtn}>
            {!isNaN(MySquadCaptain.captain_id) &&
            !isNaN(MySquadCaptain.vice_captain_id) ? (
              <p onClick={() => addMySquad()}>Done</p>
            ) : (
              ""
            )}
          </div>
        </Route>
        <Route path="/:id/CreateSquad">
          <div className={styles.nav}>
            <Link to={`/${matchId}/CreateSquad/BAT`}>
              <p
                className={
                  MySquad.filter((player) => player.role === "Batsman").length <
                  3
                    ? styles.lowerLimit
                    : ""
                }
              >
                BAT
              </p>
            </Link>
            <Link to={`/${matchId}/CreateSquad/WK`}>
              <p
                className={
                  MySquad.filter((player) => player.role === "Wicket-Keeper")
                    .length < 1
                    ? styles.lowerLimit
                    : ""
                }
              >
                WK
              </p>
            </Link>
            <Link to={`/${matchId}/CreateSquad/AR`}>
              <p>AR</p>
            </Link>
            <Link to={`/${matchId}/CreateSquad/BOWL`}>
              <p
                className={
                  MySquad.filter((player) => player.role === "Bowler").length <
                  3
                    ? styles.lowerLimit
                    : ""
                }
              >
                BOWL
              </p>
            </Link>
          </div>

          <div className={styles.main}>
            <Switch>
              <Route path="/:id/CreateSquad/BAT">
                <p className={styles.title}>Pick 3-7 Batsmen</p>
                <Squadtable
                  PlayersList={PlayerTypes.bat}
                  addPlayerToSquad={addPlayerToSquad}
                  MySquad={MySquad}
                  removePlayerFromSquad={removePlayerFromSquad}
                />
              </Route>
              <Route path="/:id/CreateSquad/WK">
                <p className={styles.title}>Pick 1-5 Wicket keepers</p>
                <Squadtable
                  PlayersList={PlayerTypes.wk}
                  addPlayerToSquad={addPlayerToSquad}
                  MySquad={MySquad}
                  removePlayerFromSquad={removePlayerFromSquad}
                />
              </Route>
              <Route path="/:id/CreateSquad/AR">
                <p className={styles.title}>Pick 0-4 All Rounders</p>
                <Squadtable
                  PlayersList={PlayerTypes.ar}
                  addPlayerToSquad={addPlayerToSquad}
                  MySquad={MySquad}
                  removePlayerFromSquad={removePlayerFromSquad}
                />
              </Route>
              <Route path="/:id/CreateSquad/BOWL">
                <p className={styles.title}>Pick 3-7 Bowlers</p>
                <Squadtable
                  PlayersList={PlayerTypes.bowl}
                  addPlayerToSquad={addPlayerToSquad}
                  MySquad={MySquad}
                  removePlayerFromSquad={removePlayerFromSquad}
                />
              </Route>
            </Switch>
          </div>
          {MySquad.length === 11 ? (
            <div className={styles.proceedBtn}>
              <Link to={`/${matchId}/CreateSquad/selectCaptain`}>
                <p>Proceed</p>
              </Link>
            </div>
          ) : (
            ""
          )}
          <div className={styles.botumMenu}>
            <div className={styles.menueItem}>
              <p className={styles.iteminfo}>{`${MySquad.length}/11`}</p>
              <p>Players</p>
            </div>
            {/* </div> */}
            <div className={styles.menueItem}>
              <div className={styles.icons}>
                <img src={Teams.A[0] && Teams.A[0].team_logo} alt="" />
                <p className={styles.iteminfo}>
                  {Teams.A[0] &&
                    MySquad.filter(
                      (player) => player.team_name === Teams.A[0].team_name
                    ).length}
                </p>
              </div>
              <p>{Teams.A[0] && Teams.A[0].team_short_name}</p>
            </div>

            <div className={styles.menueItem}>
              <div className={styles.icons}>
                <img src={Teams.B[0] && Teams.B[0].team_logo} alt="" />
                <p className={styles.iteminfo}>
                  {Teams.B[0] &&
                    MySquad.filter(
                      (player) => player.team_name === Teams.B[0].team_name
                    ).length}
                </p>
              </div>
              <p>{Teams.B[0] && Teams.B[0].team_short_name}</p>
            </div>
            <div className={styles.menueItem}>
              <p className={`${styles.iteminfo} ${styles.credit}`}>{Credit}</p>
              <p>Cr Left</p>
            </div>
          </div>
        </Route>
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => ({
  // Leagues: state.fantasyCricket.Leagues,
  // matches: state.fantasyCricket.matches,
  Players: state.fantasyCricket.Players,
  matchId: state.fantasyCricket.matchId,
  resMySquad: state.fantasyCricket.MySquad,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getPlayers: () => {
      dispatch(getPlayers());
    },
    setSquad: (payload) => {
      dispatch(setSquad(payload));
    },
    getSquads: (payload) => {
      dispatch(getSquads(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSquad);
