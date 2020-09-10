import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Match from "./components/match/match.component";
import BoardUser from "./components/board-user.component";
import { dynamicList } from "./components/dynamicList.component";
import BoardAdmin from "./components/board-admin.component";
import RegisterTeam from "./components/registerTeam.component";
import { Statistics } from "./components/match/statistics.component";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import Profile from "./components/profile.component";
import { history } from "./helpers/history";
import ProtectedRoute from "./protectedRoute";
import { TeamsList } from "./components/teams/teamList.component";
import CreatePlayer from "./components/players/createPlayer.component";
import { PlayersList } from "./components/players/playersList.component";
import StartMatch from "./components/match/startMatch.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;
    console.log(user);
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("Statist"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/teams"} className="navbar-brand">
              VolleyStats
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/teams"} className="nav-link">
                  Teams
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/start_match"} className="nav-link">
                  Start Match
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/statistics"} className="nav-link">
                  Statistics
                </Link>
              </li>
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.name}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register">
                <Register />
              </Route>
              <ProtectedRoute exact path="/match" component={Match} />
              <Route path="/user" component={BoardUser} />
              <ProtectedRoute path="/create_team" component={RegisterTeam} />
              <ProtectedRoute path="/teams" component={TeamsList} />
              <ProtectedRoute
                path="/team/:teamId/info"
                component={PlayersList}
              />
              <ProtectedRoute path="/start_match" component={StartMatch} />
              <ProtectedRoute path="/statistics" component={Statistics} />
              <ProtectedRoute path="/create_player" component={CreatePlayer} />
              <Route path="/mod" component={dynamicList} />
              <Route path="/admin" component={BoardAdmin} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
