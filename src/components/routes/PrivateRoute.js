import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import authContext from "../../context/auth/authContext";

// High order component that takes a component and it's props as parameters. In this case, if the user is not authenticated, is redirected to home page ('/'). Else, is redirected to the component. This way the component is protected.
const PrivateRoute = ({ component: Component, ...props }) => {
  // Taking props from authContext/AuthState
  const authenticationContext = useContext(authContext);
  const { authenticated, loading, authenticatedUser } = authenticationContext;

  useEffect(() => {
    authenticatedUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Route
        {...props}
        render={(props) =>
          !authenticated && !loading ? (
            <Redirect to="/" />
          ) : (
            <Component {...props} />
          )
        }
      ></Route>
    </div>
  );
};

export default PrivateRoute;
