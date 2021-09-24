// Imported into Projects.
import React, { useEffect, useContext } from "react";
import authContext from "../../context/auth/authContext";

const Bar = () => {
  // Get information from authenticated user.
  const authenticationContext = useContext(authContext);
  const { user, authenticatedUser, signOut } = authenticationContext;

  // Everytime projects page loads, authenticatedUser function from authContext is executed in order to check the user and mantain the session active, even after page refresh.
  useEffect(() => {
    authenticatedUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <header className="app-header">
        {/* Because session remains active, the displayed name will always be the one of the authenticated user */}
        {user ? (
          <p className="username">
            {" "}
            Hello <span>{user.name}</span>
          </p>
        ) : null}
        <nav className="main-nav">
          <button className="btn btn-blank" onClick={() => signOut()}>
            {" "}
            Sign Out
          </button>
        </nav>
      </header>
    </div>
  );
};

export default Bar;
