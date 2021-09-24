// Imported into TasksList.
import React from "react";
import { useContext } from "react";
import projectContext from "../../context/projects/projectContext";
import taskContext from "../../context/tasks/taskContext";

const Task = ({ task }) => {
  // Taking props from projectContext/ProjectState
  const projectsContext = useContext(projectContext);
  const { actualproject } = projectsContext;

  // Destructuring to take the actual selected project's object instead of the whole array of actualproject which contains all objects. This is brought here in order to have reference to the remaining tasks of the actual project that have to be displayed after deleting one of them with deleteTask.
  const [actualProject] = actualproject;

  // Taking props from taskContext/TaskState
  const tasksContext = useContext(taskContext);
  const { deleteTask, projectTasks, editTask, selectedTask } = tasksContext;

  // Function to delete task by id when user clicks delete task.
  const onDeleteClick = (taskId) => {
    // As backend requests the actual project id to make a delete, that value is also passed.
    deleteTask(taskId, actualProject._id);
    // Once deleted the task, projectTasks gets called and Reducer sets projecttasks state with the tasks brought from database for the actual project.
    projectTasks(actualProject.id);
  };

  //When user clicks on complete or incomplete button, onStateClick gets called and evaluates: if the task state of the clicked task is true (complete), changes it to false or viceversa (false-incomplete to true-complete). Finally, editTask takes the new task and dispatches it as payload into Reducer.
  const onStateClick = (task) => {
    if (task.status) {
      task.status = false;
    } else {
      task.status = true;
    }
    editTask(task);
  };

  // Function that is called when user clicks on edit button on a task. Takes the complete object of the selected one and dispatches it as payload to Reducer, which sets selectedtask state with that task.
  const onEditClick = (task) => {
    selectedTask(task);
  };

  return (
    <li className="task shadow">
      <p>{task.name}</p>
      <div className="state">
        {task.status ? (
          <button
            type="button"
            className="complete"
            onClick={() => onStateClick(task)}
          >
            Complete
          </button>
        ) : (
          <button
            type="button"
            className="incomplete"
            onClick={() => onStateClick(task)}
          >
            Incomplete
          </button>
        )}
      </div>
      <div className="actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onEditClick(task)}
        >
          Edit
        </button>
        {/*When user clicks delete task button, deleteTask is called in TaskState, which dispatches de action to Reducer, which filters the id of the deleted task and returns the tasks state with the remaining ones. */}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => onDeleteClick(task._id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Task;
