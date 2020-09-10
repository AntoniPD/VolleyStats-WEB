import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name, username, password, roles) {
    console.log("akjsdjkalsjfklajsdf");
    console.log(roles);
    return axios.post(API_URL + "signup", {
      name,
      username,
      password,
      roles,
    });
  }
}

export default new AuthService();
