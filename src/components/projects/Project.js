// Imported into ProjectsList.
import React from "react";
import { useContext } from "react";
import projectContext from "../../context/projects/projectContext";
import taskContext from "../../context/tasks/taskContext";

const Project = ({ project }) => {
  // Taking props from projectContext/ProjectState
  const projectsContext = useContext(projectContext);
  const { actualProject } = projectsContext;

  // Taking props from taskContext/TaskState
  const tasksContext = useContext(taskContext);
  const { projectTasks } = tasksContext;

  // When user clicks on a project's name, selectProject is called which calls actualProject and Reducer filters all projects to return the chosen one and updates actualproject state with it. After, projectTasks is called and Reducer returns the tasks from database for the selected project updating projecttasks.
  const selectProject = (id) => {
    actualProject(id);
    projectTasks(id);
  };

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => selectProject(project._id)}
      >
        {project.name}
      </button>
    </li>
  );
};

export default Project;
