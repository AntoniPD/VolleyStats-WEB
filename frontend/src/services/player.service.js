import axios from "axios";
import authHeader from "../services/auth-header";

const API_URL = "http://localhost:8080/api/user/";

export const buildTokenAuthHeader = (header) => {
  return {
    headers: {
      Authorization: `Bearer ${{ "x-access-token": header.token }}`,
    },
  };
};

class PlayerService {
  createPlayer(name, number, position, height, weight, teamId, header) {
    // console.log(name);
    // console.log(header);
    return axios
      .post(
        API_URL + header.id + "/team/" + teamId + "/player",
        { name, number, position, height, weight, header },
        buildTokenAuthHeader(header)
      )
      .then((response) => {
        return response.data;
      });
  }

  getPlayersByTeamId(header, teamId) {
    return axios
      .get(
        API_URL + header.id + "/team/" + teamId + "/player",
        buildTokenAuthHeader(header)
      )
      .then((response) => {
        console.log(response.data);
        return response.data;
      });
  }
}

export default new PlayerService();
