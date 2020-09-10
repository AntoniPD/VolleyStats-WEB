import React, { useState, useEffect } from "react";
import authHeader from "../../services/auth-header";
import PlayersListView from "./playersListView.component";
import { getPlayersByTeamId } from "../../actions/player";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { matchPath } from "react-router";
import Button from "../button.component";
import { Link } from "react-router-dom";
export function PlayersList(props) {
  //   const test = useParams();
  //   console.log(test);
  const location = useLocation();
  console.log(location);
  const match = matchPath(location.pathname, {
    path: "/team/:teamId/info",
    exact: true,
    strict: false,
  });
  const teamId = match.params.teamId;
  localStorage.setItem("teamId", JSON.stringify(teamId));

  const [playersLoaded, setPlayersLoaded] = useState(false);
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);

  const logged = authHeader();
  //   console.log(logged);

  const setPeriodError = (error) => {
    setError(error);
    setTimeout(() => {
      setError(null);
    }, 4000);
  };
  const loadPlayers = async () => {
    try {
      if (!playersLoaded) {
        setPlayersLoaded(true);
        const config = {
          headers: { Authorization: `Bearer ${logged.token}` },
        };
        const response = await axios.get(
          "http://localhost:8080/api/user/" +
            logged.id +
            "/team/" +
            teamId +
            "/player",
          config
        );
        // console.log(response);
        console.log(response.data);
        setPlayers(response.data);
      }
    } catch (err) {
      setError(err);
      setPlayersLoaded(false);
    }
  };
  const updatePlayer = async (player) => {
    console.log(player);
    try {
      const config = {
        headers: { Authorization: `Bearer ${logged.token}` },
      };

      const response = await axios.put(
        "http://localhost:8080/api/user/" +
          logged.id +
          "/team/" +
          teamId +
          "/player/" +
          player._id,
        player,
        config
      );
      // console.log(response);
      console.log(response.data);
    } catch (err) {
      console.log(err.message);
      setPeriodError(err);
      setPlayersLoaded(false);
    }
  };
  loadPlayers();

  return error ? (
    <div>{error.message}</div>
  ) : (
    <PlayersListView
      {...props}
      teamId={teamId}
      players={players}
      onUpdatePlayer={updatePlayer}
    />
  );
}

// TeamListView.defaultProps = {
//   teams: [
//     {
//       name: "Modena",
//     },
//     {
//       name: "Trento",
//     },
//   ],
// };

// return (
//     <div>
//         <div onClick={() => addToCart(rowIndex)}>
//             <img src={plus} style={{backgroundColor: '#2a4252'}}/>
//         </div>
//         <div id='text-val'> {formatExtraData} </div>
//         <div onClick={() => removeFromCart(rowIndex)}>
//             <img src={minus} style={{backgroundColor: '#2a4252'}}/>
//         </div>
//     </div>
// );
