import "./App.scss";
import { connect } from "react-redux";
import { getMatchs } from "./redux/duck/fantasyCricket";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App({ fantasyCricket }) {
  console.log("this : ", fantasyCricket);
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            {/* <Route path="/" exact component={<div>HI</div>} /> */}
          </Switch>
        </div>
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
