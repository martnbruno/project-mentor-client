import { useReducer } from "react";
import taskContext from "./taskContext";
import taskReducer from "./taskReducer";
import {
  PROJECT_TASKS,
  VALIDATE_TASK,
  ADD_TASK,
  DELETE_TASK,
  SELECT_TASK,
  EDIT_TASK,
  RESET_TASK,
} from "../../types";
import axiosClient from "../../config/axios";

const TaskState = (props) => {
  const initialState = {
    // When user selects a project's name, reducer sets projecttasks state with the selected project's tasks from database, storing them into an empty array.
    projecttasks: [],
    // If user submits incomplete new task's form, showError is called and Reducer udpates taskerror to true.
    taskerror: false,
    // When user clicks on edit button on a task, the selected task is dispatched as payload to Reducer, which sets selectedtask state with that task.
    selectedtask: null,
  };

  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Function called when user selects a project's name. A get request is made to the API, returning the corresponding tasks for that project. Those tasks are passed as payload to reducer, which sets projecttasks state with them.
  const projectTasks = async (project) => {
    try {
      const response = await axiosClient.get("/api/tasks", {
        params: { project },
      });
      dispatch({
        type: PROJECT_TASKS,
        payload: response.data.tasks,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Function called when user clicks on add task. The new task is sent to the Reducer which updates projecttasks state with the existing ones and the new one.
  const addTask = async (task) => {
    try {
      const response = await axiosClient.post("/api/tasks", task);
      dispatch({
        type: ADD_TASK,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Function that is called when user submits incomplete new task form and Reducer udpates taskerror to true.
  const showError = () => {
    dispatch({
      type: VALIDATE_TASK,
    });
  };

  // Function that is called when user clicks on Delete task button and Reducer updates tasks filtering the deleted one from the others and returning them. To make a delete request, backend asks for project and id so those values are passed.
  const deleteTask = async (id, project) => {
    try {
      await axiosClient.delete(`/api/tasks/${id}`, { params: { project } });
      dispatch({
        type: DELETE_TASK,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Function that is called when user clicks complete or incomplete on a specific task; or when user clicks on edit task button. Takes the complete object of the edited task and dispatches it as payload to Reducer.
  const editTask = async (task) => {
    try {
      const response = await axiosClient.put(`/api/tasks/${task._id}`, task);
      dispatch({
        type: EDIT_TASK,
        payload: response.data.task,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Function that is called when user clicks on edit button on a task. Takes the complete object of the selected one and dispatches as payload to Reducer, which sets selectedtask state with that task.
  const selectedTask = (task) => {
    dispatch({
      type: SELECT_TASK,
      payload: task,
    });
  };

  // Function that is called after the edition of a task in order to reset the selectedtask state to the initial value (null).
  const resetSelectedTask = () => {
    dispatch({
      type: RESET_TASK,
    });
  };

  return (
    <taskContext.Provider
      value={{
        projecttasks: state.projecttasks,
        taskerror: state.taskerror,
        selectedtask: state.selectedtask,
        projectTasks,
        addTask,
        showError,
        deleteTask,
        selectedTask,
        editTask,
        resetSelectedTask,
      }}
    >
      {props.children}
    </taskContext.Provider>
  );
};

export default TaskState;
