// Imported into App.
import React from "react";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import alertContext from "../../context/alerts/alertContext";
import authContext from "../../context/auth/authContext";

const Register = (props) => {
  // Taking props from alertContext/AlertState
  const alertsContext = useContext(alertContext);
  const { alert, showAlert } = alertsContext;

  // Taking props from authContext/AuthState
  const authenticationContext = useContext(authContext);
  const { message, authenticated, registerUser } = authenticationContext;

  // If authenticated state at AuthState is set to true, useEffect takes the user into /projects route.
  useEffect(() => {
    if (authenticated) {
      props.history.push("/projects");
    }
    // In case the user is already registered, an alert is shown with message state from AuthState, which in case of error is set by Reducer with the response message from userController at api/users ("this user already exists")
    else if (message) {
      showAlert(message.msg, message.category);
    }
    // eslint-disable-next-line
  }, [message, authenticated, props.history]);

  // State that takes user information at registration (email, name, password, password confirmation).
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passconfirmation: "",
  });

  const { name, email, password, passconfirmation } = user;

  // Function that takes input values to user state.
  const onChange = (e) =>
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  // Function that evaluates if registration fields were correctly completed by user. In case they weren't, returns showAlert function with msg and category from AlertState.
  const onSubmit = (e) => {
    e.preventDefault();
    // Check that fields are not empty
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      passconfirmation.trim() === ""
    ) {
      showAlert("All fields are required", "alert-error");
      return;
    }
    // Check that password is al least 6 characters long
    if (password.length < 6) {
      showAlert("Password must be at least 6 characters", "alert-error");
      return;
    }
    // Check that password and passconfirmation are the same
    if (password !== passconfirmation) {
      showAlert(
        "Password and Password Confirmation are not the same",
        "alert-error"
      );
      return;
    }
    // After validation is passed, registerUser takes name, email and password to AuthState where REGISTRATION_SUCESS or REGISTRATION_ERROR are executed, making a post request to /api/users in order to register the new user.
    registerUser({ name, email, password });
  };

  return (
    <div className="user-form">
      {alert ? (
        <div className={`alert ${alert.category}`}>{alert.msg}</div>
      ) : null}
      <div className="form-container shadow-dark">
        <h1>Create Account</h1>
        <form onSubmit={onSubmit}>
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={onChange}
            />
          </div>
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
            <label htmlFor="passconfirmation">Confirm Password</label>
            <input
              type="password"
              id="passconfirmation"
              name="passconfirmation"
              placeholder="Confirm your password"
              value={passconfirmation}
              onChange={onChange}
            />
          </div>
          <div className="form-field">
            <input
              type="submit"
              className="btn btn-primary btn-block"
              value="Register"
            />
          </div>
        </form>
        {/* Link to /SignIn */}
        <Link to={"/"} className="account-link">
          {" "}
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Register;
