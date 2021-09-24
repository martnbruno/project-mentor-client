import React from "react";
import { useReducer } from "react";
import alertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { SHOW_ALERT, HIDE_ALERT } from "../../types";

const AlertState = (props) => {
  const initialState = {
    alert: null,
  };

  // Calling useReducer.
  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Function that shows the alert message when user is registering or signing. SHOW_ALERT dispatches a message and a category to Reducer, which updates alert state with them. After 5 seconds, HIDE_ALERT is dispatched, and alert is set to null.
  const showAlert = (msg, category) => {
    dispatch({
      type: SHOW_ALERT,
      payload: {
        msg,
        category,
      },
    });

    setTimeout(() => {
      dispatch({
        type: HIDE_ALERT,
      });
    }, 5000);
  };
  return (
    <alertContext.Provider
      value={{
        alert: state.alert,
        showAlert,
      }}
    >
      {props.children}
    </alertContext.Provider>
  );
};

export default AlertState;
