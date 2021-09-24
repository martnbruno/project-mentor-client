import axiosClient from "./axios";

//  Function that gets the token from AuthState, and places it into the defaults of header, else in case there isn't a token anymore, deletes it from header.
const tokenAuth = (token) => {
  if (token) {
    axiosClient.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axiosClient.defaults.headers.common["x-auth-token"];
  }
};

export default tokenAuth;
