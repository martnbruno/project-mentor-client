// Imported into App.
import React from "react";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import alertContext from "../../context/alerts/alertContext";
import authContext from "../../context/auth/authContext";

const SignIn = (props) => {
  // Taking props from alertContext/AlertState
  const alertsContext = useContext(alertContext);
  const { alert, showAlert } = alertsContext;

  // Taking props from authContext/AuthState
  const authenticationContext = useContext(authContext);
  const { message, authenticated, signIn } = authenticationContext;

  // If sign in is ok, authenticated users are taken to their projects. If user or password do not exist or are incorrect, shows alert. In this case, an alert is shown with message state from AuthState, which if error is set by Reducer with the response message from userController at api/users ("this user doesn't exist" or "password is incorrect")
  useEffect(() => {
    if (authenticated) {
      props.history.push("/projects");
    }
    if (message) {
      showAlert(message.msg, message.category);
    }
    // eslint-disable-next-line
  }, [message, authenticated, props.history]);

  // State that takes user information when signing in (email, password).
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // Destructuring user.
  const { email, password } = user;

  // Function that takes input values to user state.
  const onChange = (e) =>
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  // Function that evaluates if sign in fields were correctly completed by user. In case they weren't,returns showAlert function with msg and category from AlertState.
  const onSubmit = (e) => {
    e.preventDefault();
    // Check that fields are not empty
    if (email.trim() === "" || password.trim() === "") {
      showAlert("All fields are required", "alert-error");
    }
    // After validation is passed,signIn takes email and password to AuthState where SIGNIN_SUCESS or SIGNIN_ERROR are executed, making a post request to /api/users in order to sign in the authenticated user.
    signIn({ email, password });
  };

  return (
    <div className="user-form">
      {alert ? (
        <div className={`alert ${alert.category}`}>{alert.msg}</div>
      ) : null}
      <div className="form-container shadow-dark">
        <h1>Sign In</h1>
        <form onSubmit={onSubmit}>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="form-field">
            <input
              type="submit"
              className="btn btn-primary btn-block"
              value="Sign In"
            />
          </div>
        </form>
        {/* Link to Register component. */}
        <Link to={"/register"} className="account-link">
          {" "}
          Register
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
