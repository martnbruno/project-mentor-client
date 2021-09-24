// Imported into App.
import React, { useContext, useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import Bar from "../layout/Bar";
import NewTask from "../tasks/NewTask";
import TasksList from "../tasks/TasksList";
import authContext from "../../context/auth/authContext";

const Projects = () => {
  // Get information from authenticated user.
  const authenticationContext = useContext(authContext);
  const { authenticatedUser } = authenticationContext;

  // Everytime projects page loads, authenticatedUser function from authContext is executed in order to check the user and mantain the session active, even after page refresh.
  useEffect(() => {
    authenticatedUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-section">
        <Bar />
        <main>
          <NewTask />
          <div className="tasks-container">
            <TasksList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;
