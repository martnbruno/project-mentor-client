// Imported into App.
import React from "react";
import { useReducer } from "react";
import projectContext from "./projectContext";
import projectReducer from "./projectReducer";
import {
  PROJECT_FORM,
  GET_PROJECTS,
  CREATE_PROJECT,
  VALIDATE_FORM,
  ACTUAL_PROJECT,
  DELETE_PROJECT,
  PROJECT_ERROR,
} from "../../types";
import axiosClient from "../../config/axios";

const ProjectState = (props) => {
  // Initial state of projects.
  const initialState = {
    // If user clicks the new project button, showForm is called, Reducer sets form to true and opens NewProject's form to create a new one.
    form: false,
    // Array of projects brought from database.
    projects: [],
    // If user submits incomplete NewProject's form, showError is called and Reducer udpates formerror to true.
    formerror: false,
    // When user clicks on a project's name, actualProject is called and Reducer filters all projects to return the chosen one and update actualproject with it.
    actualproject: null,
    // State updated with an error message from the API when needed.
    message: null,
  };

  // Calling useReducer.
  const [state, dispatch] = useReducer(projectReducer, initialState);

  // Function that shows the new project form using dispatch to execute PROJECT_FORM action to Reducer, which updates the form state to true.
  const showForm = () => {
    dispatch({
      type: PROJECT_FORM,
    });
  };

  // Function to get projects from database, using dispatch to execute GET_PROJECTS action. The response with the projects is passed as payload to Reducer wich updates projects' state with said projects.
  const getProjects = async () => {
    try {
      const response = await axiosClient.get("/api/projects");
      dispatch({
        type: GET_PROJECTS,
        payload: response.data.projects,
      });
    } catch (error) {
      const alert = {
        msg: "There was an error",
        category: "alert-error",
      };
      dispatch({
        type: PROJECT_ERROR,
        payload: alert,
      });
    }
  };

  // Function to create a new project, using dispatch to execute CREATE_PROJECT. Takes project as a parameter and makes a post request with it to the API. After passes it as payload to Reducer to update state.
  const createProject = async (project) => {
    try {
      const response = await axiosClient.post("/api/projects", project);
      dispatch({
        type: CREATE_PROJECT,
        payload: response.data,
      });
    } catch (error) {
      const alert = {
        msg: "There was an error",
        category: "alert-error",
      };
      dispatch({
        type: PROJECT_ERROR,
        payload: alert,
      });
    }
  };

  // Function that is called when user submits incomplete NewProject's form and Reducer udpates formerror to true.
  const showError = () => {
    dispatch({
      type: VALIDATE_FORM,
    });
  };

  // Function that is called when user clicks on a project's name and Reducer updates actualproject with that name by filtering it from the others.
  const actualProject = (projectId) => {
    dispatch({
      type: ACTUAL_PROJECT,
      payload: projectId,
    });
  };

  // Function that is called when user clicks on Delete Project button in TaskList, a delete request is made to the API with the project's id, and Reducer updates projects filtering the deleted one from the others.
  const deleteProject = async (projectId) => {
    try {
      await axiosClient.delete(`api/projects/${projectId}`);
      dispatch({
        type: DELETE_PROJECT,
        payload: projectId,
      });
    } catch (error) {
      const alert = {
        msg: "There was an error",
        category: "alert-error",
      };
      dispatch({
        type: PROJECT_ERROR,
        payload: alert,
      });
    }
  };

  return (
    // Context provider to make ProjectState's props available to any component in App.
    <projectContext.Provider
      value={{
        projects: state.projects,
        form: state.form,
        formerror: state.formerror,
        actualproject: state.actualproject,
        message: state.message,
        showForm,
        getProjects,
        createProject,
        showError,
        actualProject,
        deleteProject,
      }}
    >
      {props.children}
    </projectContext.Provider>
  );
};
export default ProjectState;
