import axios from "axios";

const API_URL = "http://localhost:8080/api/user/";

export const buildTokenAuthHeader = (header) => {
  return {
    headers: {
      Authorization: `Bearer ${{ "x-access-token": header.token }}`,
    },
  };
};

class TeamService {
  createTeam(name, header) {
    // console.log(name);
    // console.log(header);
    return axios
      .post(
        API_URL + header.id + "/team",
        { name, header },
        buildTokenAuthHeader(header)
      )
      .then((response) => {
        return response.data;
      });
  }

  getTeamByUserId(header) {
    return axios
      .get(API_URL + header.id + "/team", buildTokenAuthHeader(header))
      .then((response) => {
        console.log(response.data);
        return response.data;
      });
  }
}

export default new TeamService();
