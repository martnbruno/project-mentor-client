// Imported into Projects.
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import projectContext from "../../context/projects/projectContext";
import taskContext from "../../context/tasks/taskContext";

const NewTask = () => {
  // Taking props from projectContext/ProjectState
  const projectsContext = useContext(projectContext);
  const { actualproject } = projectsContext;

  // Taking props from taskContext/TaskState
  const tasksContext = useContext(taskContext);
  const {
    taskerror,
    selectedtask,
    addTask,
    showError,
    projectTasks,
    editTask,
    resetSelectedTask,
  } = tasksContext;

  // Updates state with the input's values.
  const [task, setTask] = useState({
    name: "",
  });

  const { name } = task;

  // If edit button of a task is clicked, useEffect is executed and task state is updated with the selected task. But if there is no selected task to edit, task state is set to it's initial value.
  useEffect(() => {
    if (selectedtask !== null) {
      setTask(selectedtask);
    } else {
      setTask({
        name: "",
      });
    }
  }, [selectedtask]);

  // If there's no selected project return null.
  if (!actualproject) return null;

  // Destructuring to take the selected project's object instead of the whole array of actualproject which contains all objects.
  const [actualProject] = actualproject;

  // Function that takes input's values and updates task state with it.
  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  // Function that creates or edits the selected task when user clicks add task or edit task buttons.
  const onSubmitTask = (e) => {
    e.preventDefault();
    // Validation.
    if (name.trim() === "") {
      showError();
      return;
    }
    //If the task is new, addTask is executed, but if an existing task was selected for edition editTask is called and the edited task is sent to TaskState.
    if (selectedtask === null) {
      // The id given to the task (task.project) is equal to the actual selected project (backend task model object requires the project which owns each task).
      task.project = actualProject._id;
      // addTask takes the new task to TaskState.
      addTask(task);
    } else {
      // editTask takes the modified task to TaskState.
      editTask(task);
      // After the task was successfully edited, resetSelectedTask in order to reset (clean) the selectedtask state to the initial state (null).
      resetSelectedTask();
    }
    // Once added the new task or edited the selected one, projectTasks gets called and Reducer returns project's tasks from database with the corresponding tasks for the actual selected project, updating projecttasks state with them.
    projectTasks(actualProject.id);
    // Reset form after adding or editing task correctly.
    setTask({
      name: "",
    });
  };

  return (
    <div className="form">
      <form onSubmit={onSubmitTask}>
        <div className="input-container">
          <input
            type="text"
            className="input-text"
            placeholder="Task Name..."
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <input
            type="submit"
            className="btn btn-primary btn-submit btn-block"
            // In case a task is selected to edition, the value of the input is Edit Task, else it is set to Add Task.
            value={selectedtask ? "Edit Task" : "Add Task"}
          />
        </div>
      </form>
      {/* If form validation is incorrect showError is called, the dispatch sends action to Reducer and taskerror state is set to true, showing the error. */}
      {taskerror ? (
        <p className="message error">Task Name is required</p>
      ) : null}
    </div>
  );
};

export default NewTask;
