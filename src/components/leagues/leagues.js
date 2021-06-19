import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import styles from "./leagues.module.scss";
import LeaguesCont from "./leaguesCont/leaguesCont";
// import { Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CreateSquad from "./createSquad/createSquad";

import {
  getLeagues,
  getMatchId,
  getSquads,
} from "../../redux/duck/fantasyCricket";

export const Leagues = ({
  getLeagues,
  getMatchId,
  getSquads,
  Leagues,
  matches,
  Squads,
}) => {
  const { id } = useParams();
  const match = matches.filter((match) => String(match.id) === id)[0];
  // console.log(match);
  const { event_name, match_date } = match;
  const history = useHistory();

  const [timeLeft, settimeLeft] = useState("00:00:00");

  useEffect(() => {
    getMatchId(id);
    getSquads(id);
  }, [getMatchId, id, getSquads]);

  useEffect(() => {
    getLeagues(id);
  }, [getLeagues, id]);
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
    <div className={styles.leagues}>
      <div className={styles.header}>
        <div className={styles.backAro} onClick={() => history.goBack()}>
          {/* <Link to={useHistory()}> */}
          <IoMdArrowRoundBack size={40} />
          {/* </Link> */}
        </div>
        <div className={styles.mainHeader}>
          <p className={styles.title}>{event_name}</p>
          <p className={styles.timer}>{timeLeft}</p>
        </div>
      </div>
      <Switch>
        <Route path="/:id/CreateSquad">
          <CreateSquad />
        </Route>
        <Route path="/:id">
          <LeaguesCont Leagues={Leagues} id={id} Squads={Squads} />
        </Route>
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => ({
  Leagues: state.fantasyCricket.Leagues,
  matches: state.fantasyCricket.matches,
  Squads: state.fantasyCricket.Squads,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getLeagues: (id) => {
      dispatch(getLeagues(id));
    },
    getMatchId: (id) => {
      dispatch(getMatchId(id));
    },
    getSquads: (id) => {
      dispatch(getSquads(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Leagues);
