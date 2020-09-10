import { Component } from "react";
import React, { Fragment } from "react";
import { Header } from "semantic-ui-react";
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import axios from "axios";
import authHeader from "../../services/auth-header";
import matchService from "../../services/match.service";
class Match extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      allyPoints: 0,
      oppPoints: 0,
      allyGames: 0,
      oppGames: 0,
      players: [],
      attempts: 0,
      errors: 0,
      points: 0,
      opponent: "",
      allSpikes: 0,
      allBlocks: 0,
      allSpikeErrors: 0,
      allBlockErrors: 0,
      allServeErrors: 0,
      allReceiveErrors: 0,
      allAces: 0,
      allAttempts: 0,
      isFinished: false,
      token: authHeader(),
    };
  }

  async componentDidMount() {
    const logged = authHeader();

    try {
      // if (!playersLoaded) {
      // setPlayersLoaded(true);
      const config = {
        headers: { Authorization: `Bearer ${logged.token}` },
      };
      const matchId = JSON.parse(localStorage.getItem("matchId"));

      const response = await axios.get(
        "http://localhost:8080/api/match/" + matchId,
        config
      );
      // console.log(response);
      this.setState({
        players: response.data.players,
        opponent: response.data.opponent,
        id: response.data._id,
        allyGames: response.data.allyGames,
        oppGames: response.data.opponentGames,
        allyPoints: 0,
        oppPoints: 0,
      });
      console.log(response.data);
      // setPlayers(response.data);
      // }
    } catch (err) {
      // setError(err);
      // setPlayersLoaded(false);
    }
  }

  increasePlayerStat = (index, stat) => {
    // updatePlayers = players[index][stat]++;
    let newArray = [...this.state.players];
    newArray[index][stat] = this.state.players[index][stat] + 1;
    console.log(newArray);
    switch (stat) {
      case "spikeErrors":
        this.setState((prev) => ({
          allSpikeErrors: prev.allSpikeErrors + 1,
        }));
        this.increaseOpponentPoints();
        break;
      case "blockErrors":
        this.setState((prev) => ({
          allBlockErrors: prev.allBlockErrors + 1,
        }));
        this.increaseOpponentPoints();
        break;
      case "serveErrors":
        this.setState((prev) => ({
          allServeErrors: prev.allServeErrors + 1,
        }));
        this.increaseOpponentPoints();
        break;
      case "receiveErrors":
        this.setState((prev) => ({
          allReceiveErrors: prev.allReceiveErrors + 1,
        }));
        this.increaseOpponentPoints();
        break;
      case "spikes":
        this.setState((prev) => ({
          allSpikes: prev.allSpikes + 1,
        }));
        this.increaseAllyPoints();
        break;
      case "blocks":
        this.setState((prev) => ({
          allBlocks: prev.allBlocks + 1,
        }));
        this.increaseAllyPoints();
        break;
      case "aces":
        this.setState((prev) => ({
          allAces: prev.allAces + 1,
        }));
        this.increaseAllyPoints();
        break;
      case "attempts":
        this.setState((prev) => ({
          allAttempts: prev.allAttempts + 1,
        }));
        break;
    }
    this.setState(() => ({
      players: newArray,
    }));
  };
  decreasePlayerStat = (index, stat) => {
    // updatePlayers = players[index][stat]++;
    let newArray = [...this.state.players];
    newArray[index][stat] = this.state.players[index][stat] - 1;
    if (newArray[index][stat] < 0) {
      newArray[index][stat] = 0;
    }
    switch (stat) {
      case "spikeErrors":
        this.setState((prev) => ({
          allSpikeErrors:
            prev.allSpikeErrors - 1 < 0 ? 0 : prev.allSpikeErrors - 1,
        }));
        this.decreaseOpponentPoints();
        break;
      case "blockErrors":
        this.setState((prev) => ({
          allBlockErrors: prev.allBlockErrors - 1 < 0 ? 0 : prev.allBlockErrors,
        }));
        this.decreaseOpponentPoints();
        break;
      case "serveErrors":
        this.setState((prev) => ({
          allServeErrors: prev.allServeErrors - 1 < 0 ? 0 : prev.allServeErrors,
        }));
        this.decreaseOpponentPoints();
        break;
      case "receiveErrors":
        this.setState((prev) => ({
          allReceiveErrors:
            prev.allReceiveErrors - 1 < 0 ? 0 : prev.allReceiveErrors,
        }));
        this.decreaseOpponentPoints();
        break;
      case "spikes":
        this.setState((prev) => ({
          allSpikes: prev.allSpikes - 1 < 0 ? 0 : prev.allSpikes,
        }));
        this.decreaseAllyPoints();
        break;
      case "blocks":
        this.setState((prev) => ({
          allBlocks: prev.allBlocks - 1 < 0 ? 0 : prev.allBlocks,
        }));
        this.decreaseAllyPoints();
        break;
      case "aces":
        this.setState((prev) => ({
          allAces: prev.allAces - 1 < 0 ? 0 : prev.allAces,
        }));
        this.decreaseAllyPoints();
        break;
      case "attempts":
        this.setState((prev) => ({
          allAttempts: prev.allAttempts - 1 < 0 ? 0 : prev.allAttempts,
        }));
        break;
    }
    console.log(newArray);
    this.setState(() => ({
      players: newArray,
    }));
  };

  increaseAllyPoints = () => {
    this.setState(
      (prev) => ({
        allyPoints: prev.allyPoints + 1,
      }),
      () => {
        console.log(this.state.allyPoints);
      }
    );

    if (
      this.state.oppGames == 2 &&
      this.state.allyGames == 2 &&
      this.state.allyPoints > 14 &&
      Math.abs(this.state.allyPoints - this.state.oppPoints) > 1
    ) {
      this.resetPointsOnAllyGame();
    }
    if (
      this.state.allyPoints > 23 &&
      Math.abs(this.state.allyPoints - this.state.oppPoints) > 1
    ) {
      this.resetPointsOnAllyGame();
      if (this.state.allyGames == 3) {
        this.endMatch();
      }
    }
  };
  resetPointsOnOpponentGame = () => {
    const match = {
      _id: this.state.id,
      opponent: this.state.opponent,
      allyGames: this.state.allyGames,
      opponentGames: this.state.oppGames + 1,
      allyPoints: this.state.allyPoints,
      opponentPoints: this.state.oppPoints,
      attempts: this.state.allAttempts,
      allAces: this.state.allAces,
      allServeErrors: this.allServeErrors,
      allSpikes: this.state.allSpikes,
      allSpikeErrors: this.state.allSpikeErrors,
      allBlocks: this.state.allBlocks,
      allBlockErrors: this.state.allBlockErrors,
      players: this.state.players,
    };
    matchService.updateMatch(match, this.state.token);
    this.setState((prev) => ({
      oppGames: prev.oppGames + 1,
      oppPoints: 0,
      allyPoints: 0,
    }));
  };
  increaseOpponentPoints = () => {
    this.setState(
      (prev) => ({
        oppPoints: prev.oppPoints + 1,
        errors: prev.errors++,
      }),
      () => {
        console.log(this.state.oppPoints);
      }
    );
    if (
      this.state.oppGames == 2 &&
      this.state.allyGames == 2 &&
      this.state.oppPoints > 14 &&
      Math.abs(this.state.oppPoints - this.state.allyPoints) > 1
    ) {
      this.resetPointsOnOpponentGame();
    }
    if (
      this.state.oppPoints > 23 &&
      Math.abs(this.state.oppPoints - this.state.allyPoints) > 1
    ) {
      this.resetPointsOnOpponentGame();
      if (this.state.oppGames == 3) {
        this.endMatch();
      }
    }
  };

  endMatch = () => {
    this.setState({
      isFinished: true,
    });
  };

  resetPointsOnAllyGame = () => {
    const match = {
      _id: this.state.id,
      opponent: this.state.opponent,
      allyGames: this.state.allyGames + 1,
      opponentGames: this.state.oppGames,
      allyPoints: this.state.allyPoints,
      opponentPoints: this.state.oppPoints,
      attempts: this.state.allAttempts,
      allAces: this.state.allAces,
      allServeErrors: this.allServeErrors,
      allSpikes: this.state.allSpikes,
      allSpikeErrors: this.state.allSpikeErrors,
      allBlocks: this.state.allBlocks,
      allBlockErrors: this.state.allBlockErrors,
      // errorPoints: this.state.errorPoints,
      players: this.state.players,
    };
    matchService.updateMatch(match, this.state.token);
    this.setState((prev) => ({
      allyGames: prev.allyGames + 1,
      oppPoints: 0,
      allyPoints: 0,
    }));
  };

  increaseAllyGames = () => {
    this.setState(
      (prev) => ({
        allyGames: prev.allyGames + 1,
      }),
      () => {
        console.log(this.state.allyGames);
      }
    );
  };
  increaseOpponentGames = () => {
    this.setState(
      (prev) => ({
        oppGames: prev.oppGames + 1,
      }),
      () => {
        console.log(this.state.oppGames);
      }
    );
  };
  decreaseAllyPoints = () => {
    if (this.state.allyPoints - 1 < 0) {
      return;
    }
    this.setState(
      (prev) => ({
        allyPoints: prev.allyPoints - 1,
      }),
      () => {
        console.log(this.state.allyPoints);
      }
    );
  };
  decreaseOpponentPoints = () => {
    if (this.state.oppPoints - 1 < 0) {
      return;
    }
    this.setState(
      (prev) => ({
        oppPoints: prev.oppPoints - 1,
      }),
      () => {
        console.log(this.state.oppPoints);
      }
    );
  };
  decreaseAllyGames = () => {
    if (this.state.allyGames - 1 < 0) {
      return;
    }
    this.setState(
      (prev) => ({
        allyGames: prev.allyGames - 1,
      }),
      () => {
        console.log(this.state.allyGames);
      }
    );
  };
  decreaseOpponentGames = () => {
    if (this.state.oppGames - 1 < 0) {
      return;
    }
    this.setState(
      (prev) => ({
        oppGames: prev.oppGames - 1,
      }),
      () => {
        console.log(this.state.oppGames);
      }
    );
  };

  render() {
    const columns = [
      {
        label: "Name",
        field: "name",
        sort: "asc",
      },
      {
        label: "Spikes",
        field: "spikes",
        sort: "asc",
      },
      {
        label: "Blocks",
        field: "blocks",
        sort: "asc",
      },
      {
        label: "SpikeErrors",
        field: "spikeErrors",
        sort: "asc",
      },
      {
        label: "BlockErrors",
        field: "blockErrors",
        sort: "asc",
      },
      {
        label: "ServerErrors",
        field: "serveErrors",
        sort: "asc",
      },
      {
        label: "ReceiveErrors",
        field: "receiveErrors",
        sort: "asc",
      },
      {
        label: "Aces",
        field: "aces",
        sort: "asc",
      },
      {
        label: "Attempts",
        field: "attempts",
        sort: "asc",
      },
    ];
    let player_rows = [];
    if (this.state.players.length > 0) {
      for (let i = 0; i < this.state.players.length; i++) {
        player_rows.push({
          name: this.state.players[i]["name"],
          spikes: [
            <MDBBtn
              color="default"
              rounded
              size="sm"
              onClick={() => this.increasePlayerStat(i, "spikes")}
            >
              +
            </MDBBtn>,
            <Fragment>{this.state.players[i].spikes}</Fragment>,
            <MDBBtn
              color="default"
              rounded
              size="sm"
              onClick={() => this.decreasePlayerStat(i, "spikes")}
            >
              -
            </MDBBtn>,
          ],
          blocks: [
            <MDBBtn
              color="default"
              rounded
              size="sm"
              onClick={() => this.increasePlayerStat(i, "blocks")}
            >
              +
            </MDBBtn>,
            <Fragment>{this.state.players[i].blocks}</Fragment>,
            <MDBBtn
              color="default"
              rounded
              size="sm"
              onClick={() => this.decreasePlayerStat(i, "blocks")}
            >
              -
            </MDBBtn>,
          ],
          spikeErrors: [
            <MDBBtn
              color="default"
              rounded
              size="sm"
              onClick={() => this.increasePlayerStat(i, "spikeErrors")}
            >
              +
            </MDBBtn>,
            <Fragment>{this.state.players[i].spikeErrors}</Fragment>,
            <MDBBtn
              color="default"
              rounded
              size="sm"
              onClick={() => this.decreasePlayerStat(i, "spikeErrors")}
            >
              -
            </MDBBtn>,
          ],
          blockErrors: [
            <MDBBtn
              color="default"
              rounded
              size="sm"
              onClick={() => this.increasePlayerStat(i, "blockErrors")}
            >
              +
            </MDBBtn>,
            <Fragment>{this.state.players[i].blockErrors}</Fragment>,
            <MDBBtn
              color="default"
              rounded
              size="sm"
              onClick={() => this.decreasePlayerStat(i, "blockErrors")}
            >
              -
            </MDBBtn>,
          ],
          serveErrors: [
            <MDBBtn
              color="default"
              rounded
              size="sm"
              onClick={() => this.increasePlayerStat(i, "serveErrors")}
            >
              +
            </MDBBtn>,
            <Fragment>{this.state.players[i].serveErrors}</Fragment>,
            <MDBBtn
              color="default"
              rounded
              size="sm"
              onClick={() => this.decreasePlayerStat(i, "serveErrors")}
            >
              -
            </MDBBtn>,
          ],
          receiveErrors: [
            <MDBBtn
              color="default"
              rounded
              size="sm"
              onClick={() => this.increasePlayerStat(i, "receiveErrors")}
            >
              +
            </MDBBtn>,
            <Fragment>{this.state.players[i].receiveErrors}</Fragment>,
            <MDBBtn
              color="default"
              rounded
              size="sm"
              onClick={() => this.decreasePlayerStat(i, "receiveErrors")}
            >
              -
            </MDBBtn>,
          ],
          aces: [
            <MDBBtn
              color="default"
              rounded
              size="sm"
              onClick={() => this.increasePlayerStat(i, "aces")}
            >
              +
            </MDBBtn>,
            <Fragment>{this.state.players[i].aces}</Fragment>,
            <MDBBtn
              color="default"
              rounded
              size="sm"
              onClick={() => this.decreasePlayerStat(i, "aces")}
            >
              -
            </MDBBtn>,
          ],
          attempts: [
            <MDBBtn
              color="default"
              rounded
              size="sm"
              onClick={() => this.increasePlayerStat(i, "attempts")}
            >
              +
            </MDBBtn>,
            <Fragment>{this.state.players[i].attempts}</Fragment>,
            <MDBBtn
              color="default"
              rounded
              size="sm"
              onClick={() => this.decreasePlayerStat(i, "attempts")}
            >
              -
            </MDBBtn>,
          ],
        });
      }
    }
    let overall_rows = [
      {
        Name: [<Fragment>Team</Fragment>],
        Spikes: [<Fragment>{this.state.allSpikes}</Fragment>],
        Blocks: [<Fragment>{this.state.allBlocks}</Fragment>],
        SpikeErrors: [<Fragment>{this.state.allSpikeErrors}</Fragment>],
        BlockErrors: [<Fragment>{this.state.allBlockErrors}</Fragment>],
        ServeErrors: [<Fragment>{this.state.allServeErrors}</Fragment>],
        ReceiveErrors: [<Fragment>{this.state.allReceiveErrors}</Fragment>],
        Aces: [<Fragment>{this.state.allAces}</Fragment>],
        Attempts: [<Fragment>{this.state.allAttempts}</Fragment>],
      },
    ];
    console.log(this.state.players);
    return [
      [
        // [<h2>Nie</h2>, <h1>2</h1>],
        <Header as="h1" floated="left">
          Home {this.state.allyGames} : {this.state.oppGames}{" "}
          {this.state.opponent}
        </Header>,
        <Header as="h1" floated="left">
          {this.state.allyPoints} : {this.state.oppPoints}
        </Header>,
        <Header as="h1" floated="right">
          Overall Statistics
        </Header>,
      ],
      <Fragment>Players Statistics</Fragment>,
      <MDBTable btn>
        <MDBTableHead columns={columns} />
        <MDBTableBody rows={player_rows} />
      </MDBTable>,
      <Fragment>Overall Statistics</Fragment>,
      <MDBTable btn>
        <MDBTableHead columns={columns} />
        <MDBTableBody rows={overall_rows} />
      </MDBTable>,
    ];
  }
}
export default Match;
