import React from "react";
import { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import axiosClient from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";
import {
  GET_USER,
  LOG_OUT,
  REGISTRATION_ERROR,
  REGISTRATION_SUCCESS,
  SIGNIN_ERROR,
  SIGNIN_SUCCESS,
} from "../../types";

const AuthState = (props) => {
  const initialState = {
    // State that saves the token in local storage after authentication.
    token: localStorage.getItem("token"),
    // State that is set to null or true depending if authentication is ok or not.
    authenticated: null,
    // State updated with the authenticated user each time a registration or sign in happens.
    user: null,
    // State updated with an error message from the API when needed.
    message: null,
    // State set to false when authentication is ok to avoid flashes in user's experience in each transition.
    loading: true,
  };

  // Calling useReducer.
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Function that gets the name, email and password from Register component and tries to make a post request with them to api/users in order to register a new user. If the request was successfull, the response (the token) is sent to Reducer to update state.
  const registerUser = async (data) => {
    try {
      const response = await axiosClient.post("/api/users", data);
      dispatch({
        type: REGISTRATION_SUCCESS,
        payload: response.data,
      });
      // Get the user after ok registration.
      authenticatedUser();
    } catch (error) {
      // In case the user is already registered, the response message from api/users is passed as payload and Reducer updates state with it.
      const alert = {
        msg: error.response.data.msg,
        category: "alert-error",
      };
      dispatch({
        type: REGISTRATION_ERROR,
        payload: alert,
      });
    }
  };

  // Function that returns the authenticated user. It gets the token from localstorage and sends it to tokenAuth function, which places the token into the defaults of header or deletes it.
  const authenticatedUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const response = await axiosClient.get("/api/auth");
      dispatch({
        type: GET_USER,
        payload: response.data.user,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: SIGNIN_ERROR,
      });
    }
  };

  // Function executed when users signs in. If it is ok, the function makes a post request to /api/users in order to sign in the authenticated user. Else, it shows an error alert.
  const signIn = async (data) => {
    try {
      const response = await axiosClient.post("/api/auth", data);
      dispatch({
        type: SIGNIN_SUCCESS,
        payload: response.data,
      });
      // Get the user after ok sign in.
      authenticatedUser();
    } catch (error) {
      console.log(error.response.data.msg);
      // In case the provided user doesn't exist, the response message from api/users is passed as payload and Reducer updates state with it.
      const alert = {
        msg: error.response.data.msg,
        category: "alert-error",
      };
      dispatch({
        type: SIGNIN_ERROR,
        payload: alert,
      });
    }
  };

  // Function to sign out user's session.
  const signOut = () => {
    dispatch({
      type: LOG_OUT,
    });
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        message: state.message,
        loading: state.loading,
        registerUser,
        signIn,
        authenticatedUser,
        signOut,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
