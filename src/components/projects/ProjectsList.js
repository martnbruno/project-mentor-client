// Imported into Sidebar.
import React from "react";
import { useContext } from "react";
import Project from "./Project";
import projectContext from "../../context/projects/projectContext";
import alertContext from "../../context/alerts/alertContext";
import { useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ProjectsList = () => {
  // Taking props from projectContext/ProjectState
  const projectsContext = useContext(projectContext);
  const { projects, message, getProjects } = projectsContext;

  // Taking props from alertContext/AlertState
  const alertsContext = useContext(alertContext);
  const { alert, showAlert } = alertsContext;

  // When loading page for the first time, useEffect executes getProjects which dispatches GET_PROJECTS action to Reducer which updates the projects state with the projects brought from database. If there is an error, an alert is shown from AlertState.
  useEffect(() => {
    if (message) {
      showAlert(message.msg, message.category);
    }
    getProjects();
    // eslint-disable-next-line
  }, [message]);

  // If there are no projects, return null to avoid crashing.
  if (projects.length === 0) return <p>No Projects yet, create a new one!</p>;

  return (
    <ul className="projects-list">
      {alert ? (
        <div className={`alert ${alert.category}`}>{alert.msg}</div>
      ) : null}
      {/* Maps all projects from ProjectState and return a Project component for every existing project, displaying it with react-transition-group animation. */}
      <TransitionGroup>
        {projects.map((project) => (
          <CSSTransition key={project._id} classNames="project" timeout={200}>
            <Project project={project} />
          </CSSTransition>
        ))}{" "}
      </TransitionGroup>
    </ul>
  );
};

export default ProjectsList;
