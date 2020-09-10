import React, { useState, useEffect } from "react";
import authHeader from "../../services/auth-header";
import TeamListView from "./teamListView.component";
import { getTeamsById } from "../../actions/team";
import axios from "axios";
import SimpleSelect from "../players/dropdown";

export function TeamsList(props) {
  const [teamsLoaded, setTeamsLoaded] = useState(false);
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  const logged = authHeader();
  console.log(logged);

  const setPeriodError = (error) => {
    setError(error);
    setTimeout(() => {
      setError(null);
    }, 4000);
  };
  const loadTeams = async () => {
    try {
      if (!teamsLoaded) {
        setTeamsLoaded(true);
        const config = {
          headers: { Authorization: `Bearer ${logged.token}` },
        };
        const response = await axios.get(
          "http://localhost:8080/api/user/" + logged.id + "/team",
          config
        );
        // console.log(response);
        console.log(response.data);
        setTeams(response.data);
      }
    } catch (err) {
      setPeriodError(err);
      setTeamsLoaded(false);
    }
  };
  const updateTeam = async (team) => {
    console.log(team);
    try {
      const config = {
        headers: { Authorization: `Bearer ${logged.token}` },
      };

      const response = await axios.put(
        "http://localhost:8080/api/user/" + logged.id + "/team/" + team._id,
        team,
        config
      );
      // console.log(response);
      console.log(response.data);
    } catch (err) {
      console.log(err.message);
      setPeriodError(err);
    }
  };
  loadTeams();

  return <TeamListView {...props} teams={teams} onUpdateTeam={updateTeam} />;
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
