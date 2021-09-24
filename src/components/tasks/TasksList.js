// Imported into Projects.
import React from "react";
import Task from "./Task";
import { useContext } from "react";
import projectContext from "../../context/projects/projectContext";
import taskContext from "../../context/tasks/taskContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const TasksList = () => {
  // Taking props from projectContext/ProjectState
  const projectsContext = useContext(projectContext);
  const { actualproject, deleteProject } = projectsContext;

  // Taking props from taskContext/TaskState
  const tasksContext = useContext(taskContext);
  const { projecttasks } = tasksContext;

  // If there's no selected project return a message to avoid crashing.
  if (!actualproject) return <h2>Select or Create a Project</h2>;

  // Destructuring for taking the selected project's object instead of the whole array of actualproject which contains the object.
  const [actualProject] = actualproject;

  return (
    <>
      <h2>Project: {actualProject.name}</h2>
      <ul className="tasks-list">
        {/* If there is no task shows warning, else maps all tasks and returns Task component for each existing task with react-transition-group animation. */}
        {projecttasks.length === 0 ? (
          <li className="task">
            <p>No Tasks</p>
          </li>
        ) : (
          <TransitionGroup>
            {projecttasks.map((task) => (
              <CSSTransition key={task._id} timeout={200} classNames="task">
                <Task task={task} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
      <button
        type="button"
        className="btn btn-delete"
        // When user clicks delete project button, deleteProject is called in ProjectState, which dispatches de action to Reducer, which filters the id of the deleted project and returns the projects state with the remaining ones.
        onClick={() => deleteProject(actualProject._id)}
      >
        Delete Project &times;
      </button>
    </>
  );
};

export default TasksList;
