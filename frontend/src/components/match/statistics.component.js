import React, { useState, useEffect } from "react";
import authHeader from "../../services/auth-header";
import axios from "axios";
import StatisticsView from "./statisticsView.component";

export function Statistics(props) {
  const [matchesLoaded, setMatchesLoaded] = useState(false);
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);

  const logged = authHeader();
  console.log(logged);

  const setPeriodError = (error) => {
    setError(error);
    setTimeout(() => {
      setError(null);
    }, 4000);
  };
  const loadMatches = async () => {
    try {
      if (!matchesLoaded) {
        setMatchesLoaded(true);
        const config = {
          headers: { Authorization: `Bearer ${logged.token}` },
        };
        const response = await axios.get(
          "http://localhost:8080/api/match",
          config
        );
        // console.log(response);
        console.log(response.data);
        setMatches(response.data);
      }
    } catch (err) {
      setPeriodError(err);
      setMatchesLoaded(false);
    }
  };
  loadMatches();

  return <StatisticsView {...props} matches={matches} />;
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
