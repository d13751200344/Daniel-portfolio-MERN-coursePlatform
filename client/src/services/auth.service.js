// for register service: users send post request from client-side to the server url

import axios from "axios";
const API_URL = "http://localhost:8000/api/user";

class AuthService {
  login() {}
  logout() {}
  register(username, email, password, role) {
    // use axios to send post req with info to server url (API_URL/register)
    return axios.post(API_URL + "/register", {
      // axios will return a promise obj itself after sending a request
      username,
      email,
      password,
      role,
    });
  }
}
