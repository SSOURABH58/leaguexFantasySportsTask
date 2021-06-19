import "./App.scss";
import { connect } from "react-redux";
import { getMatchs } from "./redux/duck/fantasyCricket";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Matches from "./components/matches/matches";
import Leagues from "./components/leagues/leagues";

function App({ fantasyCricket }) {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Matches} />
          <Route path="/:id" component={Leagues} />
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    fantasyCricket: state.fantasyCricket,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(getMatchs(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
