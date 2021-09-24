import { SHOW_ALERT, HIDE_ALERT } from "../../types";

const reducer = (state, action) => {
  switch (action.type) {
    // Action that shows alert updating alert state with message and category from AlertState when user is registering or signing in.
    case SHOW_ALERT:
      return {
        alert: action.payload,
      };
    // Action that hides alert 5 seconds after SHOW_ALERT was executed, setting alert state to null again.
    case HIDE_ALERT:
      return {
        alert: null,
      };
    default:
      return state;
  }
};

export default reducer;
