import axios from "axios";

const API_URL = "http://localhost:8080/api/user/";

export const buildTokenAuthHeader = (header) => {
  return {
    headers: {
      Authorization: `Bearer ${{ "x-access-token": header.token }}`,
    },
  };
};

class MatchService {
  startMatch(name, teamId, header) {
    // console.log(name);
    // console.log(header);
    return axios
      .post(
        API_URL + header.id + "/team/" + teamId + "/match",
        { name, header },
        buildTokenAuthHeader(header)
      )
      .then((response) => {
        localStorage.setItem("matchId", JSON.stringify(response.data.matchId));
        return response.data;
      });
  }

  updateMatch(match, header) {
    return axios
      .put(
        "http://localhost:8080/api/match/" + match._id,
        match,
        buildTokenAuthHeader(header)
      )
      .then((response) => {
        return response.data;
      });
  }

  //   getTeamByUserId(header) {
  //     return axios
  //       .get(API_URL + header.id + "/team", buildTokenAuthHeader(header))
  //       .then((response) => {
  //         console.log(response.data);
  //         return response.data;
  //       });
  //   }
}

export default new MatchService();
