import "./App.scss";
import { connect } from "react-redux";
import { getMatchs } from "./redux/duck/fantasyCricket";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Matches from "./components/matches/matches";
import Leagues from "./components/leagues/leagues";

function App({ fantasyCricket, matches }) {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Matches} />
          {matches[0] ? (
            <Route path="/:id" component={Leagues} />
          ) : (
            <Redirect to="/" />
          )}
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    fantasyCricket: state.fantasyCricket,
    matches: state.fantasyCricket.matches,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(getMatchs(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
