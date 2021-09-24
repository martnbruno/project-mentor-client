import {
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
  SIGNIN_ERROR,
  GET_USER,
  SIGNIN_SUCCESS,
  LOG_OUT,
} from "../../types";

const reducer = (state, action) => {
  switch (action.type) {
    // Action that gets the token from the API and stores it into localStorage after sucessfull registration or sign in; then sets authenticated state to true, loading state to false, and the error message to null.
    case REGISTRATION_SUCCESS:
    case SIGNIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        authenticated: true,
        message: null,
        loading: false,
      };
    // Action that gets the authenticated user after successful registration or sign in and sets authenticated state to true, loading state to false, and user state with said individual.
    case GET_USER:
      return {
        ...state,
        authenticated: true,
        user: action.payload,
        loading: false,
      };
    // Action that triggers when registration or sign in wasn't correct; then resets the token of the API to null and removes it from localStorage. Also returns error message from userController at api/users ("this user already exists"). Also triggers when user signs out, updating loading state to false and user and authenticated states to null.
    case REGISTRATION_ERROR:
    case SIGNIN_ERROR:
    case LOG_OUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        message: action.payload,
        user: null,
        authenticated: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
