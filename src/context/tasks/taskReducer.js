// Imported into ProjectState.
import {
  ADD_TASK,
  DELETE_TASK,
  PROJECT_TASKS,
  VALIDATE_TASK,
  SELECT_TASK,
  EDIT_TASK,
  RESET_TASK,
} from "../../types";

// Function (Reducer) that takes each action (dispatch) from TaskState and updates state.
const reducer = (state, action) => {
  switch (action.type) {
    // Action that updates projecttasks state with the tasks of the selected project filtered from database after get request made at TaskState.
    case PROJECT_TASKS:
      return {
        ...state,
        projecttasks: action.payload,
      };
    // Action that returns a new array of projecttasks state with the existing ones and the new one when the user clicks on add task button. Also sets taskerror to false again to hide the error message after passing validation.
    case ADD_TASK:
      return {
        ...state,
        projecttasks: [action.payload, ...state.projecttasks],
        taskerror: false,
      };
    // Action to update taskerror state to true in case user submits incomplete new task's form.
    case VALIDATE_TASK:
      return {
        ...state,
        taskerror: true,
      };
    // Action that evaluates if the selected task id is not equal to any task id in the actual project, and in that case filters it out and updates projecttasks state with the remaining ones.
    case DELETE_TASK:
      return {
        ...state,
        projecttasks: state.projecttasks.filter(
          (task) => task._id !== action.payload
        ),
      };
    // Action that maps projecttasks and evaluates if there is a task with same id than the dispatched task's id. When it finds it, if they are the same, returns the task as it was, but if it has changed (status or name of the task) returns the dispatched task brought from Task.js.
    case EDIT_TASK:
      return {
        ...state,
        projecttasks: state.projecttasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };
    // Action that takes the selected task when user clicks edit button and sets selectedtask state with that task.
    case SELECT_TASK:
      return {
        ...state,
        selectedtask: action.payload,
      };
    // Action that sets selectedtask state back to the initial state after the selected task has been succesfully edited.
    case RESET_TASK:
      return {
        ...state,
        selectedtask: null,
      };
    default:
      return state;
  }
};
export default reducer;
