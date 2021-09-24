// Imported into ProjectState.
import {
  PROJECT_FORM,
  GET_PROJECTS,
  CREATE_PROJECT,
  VALIDATE_FORM,
  ACTUAL_PROJECT,
  DELETE_PROJECT,
  PROJECT_ERROR,
} from "../../types";

// Function (Reducer) that takes each action (dispatch) from ProjectState and updates state.
const reducer = (state, action) => {
  switch (action.type) {
    // Action that updates form state to true and shows NewProject form when clicking "New Project" button.
    case PROJECT_FORM:
      return {
        ...state,
        form: true,
      };
    // Action to update projects state with all the projects of the database.
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    // Action to update projects state with the new project created when user clicks submit button at New Project's form. Also sets form to false again to make it disappear and formerror also to false to hide the error message.
    case CREATE_PROJECT:
      return {
        ...state,
        projects: [action.payload, ...state.projects],
        form: false,
        formerror: false,
      };
    // Action to update formerror state to true in case user submits incomplete NewProject's form.
    case VALIDATE_FORM:
      return {
        ...state,
        formerror: true,
      };
    // Action that evaluates if the selected project id is equal to any project id in projects state, and in that case filters it and updates actualproject state with it.
    case ACTUAL_PROJECT:
      return {
        ...state,
        actualproject: state.projects.filter(
          (project) => project._id === action.payload
        ),
      };
    // Action that evaluates if the selected project id is not equal to any project id in projects state, and in that case filters it out and updates projects state with the remaining ones. After that actualproject state is set to null again to delete it from Context in order to dissapear the view of that project (until then the project name is deleted but not it's view (tasks,etc.))
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id !== action.payload
        ),
        actualproject: null,
      };
    case PROJECT_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
