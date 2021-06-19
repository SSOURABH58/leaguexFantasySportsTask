import React, { useEffect } from "react";
import { connect } from "react-redux";
import { GiCricketBat } from "react-icons/gi";
import MatchCard from "./matchCard/matchCard";
import styles from "./matches.module.scss";
import { getMatchs } from "../../redux/duck/fantasyCricket";
import HorizontalScroll from "react-scroll-horizontal";
import { Link } from "react-router-dom";

export const Matches = ({ getMatchs, matches }) => {
  useEffect(() => {
    getMatchs();
  }, [getMatchs]);
  return (
    <div className={styles.matches}>
      <div className={styles.title}>
        <div className={styles.iconCont}>
          <GiCricketBat size={50} />
        </div>
        <p>Fantasy Cricket</p>
      </div>
      <HorizontalScroll>
        {[
          <div className={styles.blendcont} key={0}>
            <div className={styles.matchCards}>
              <div className={styles.scroletray}>
                {matches.map((match, i) => (
                  <Link key={i} to={`/${match.id}`}>
                    <MatchCard key={i} match={match} index={i} />
                  </Link>
                ))}
              </div>
            </div>
          </div>,
        ]}
      </HorizontalScroll>
    </div>
  );
};

const mapStateToProps = (state) => ({
  matches: state.fantasyCricket.matches,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getMatchs: () => {
      dispatch(getMatchs());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Matches);
