// Imported into Sidebar.
import React from "react";
import { useState, useContext } from "react";
import projectContext from "../../context/projects/projectContext";

const NewProject = () => {
  // Taking props from projectContex/ProjectState
  const projectsContext = useContext(projectContext);
  const { form, formerror, showForm, createProject, showError } =
    projectsContext;

  // State that takes the new project information.
  const [newproject, setNewProject] = useState({
    name: "",
  });

  // Destructuring newproject state.
  const { name } = newproject;

  // Function that takes input values to newproject state.
  const handleChange = (e) => {
    setNewProject({
      ...newproject,
      [e.target.name]: e.target.value,
    });
  };

  // Function that creates the project when user clicks submit button.
  const onSubmitProject = (e) => {
    e.preventDefault();
    // If form validation is incorrect, showError is called, the dispatch sends action to Reducer and formerror state is set to true.
    if (name.trim() === "") {
      showError();
      return;
    }
    // createProject takes the newproject to projectState.
    createProject(newproject);
    // Empties the form after creating new project.
    setNewProject({
      name: "",
    });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-block btn-primary"
        // onClick executes showForm and NewProject form appears.
        onClick={() => showForm()}
      >
        New Project
      </button>
      {form ? (
        <form className="new-project-form" onSubmit={onSubmitProject}>
          <input
            type="text"
            className="input-text"
            placeholder="Project Name"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <input
            type="submit"
            className="btn btn-block btn-primary"
            value="Create New Project"
          />
        </form>
      ) : null}

      {/* If form validation is incorrect showError is called, the dispatch sends action to Reducer and formerror state is set to true, showing the error. */}
      {formerror ? (
        <p className="message error">Project Name is required.</p>
      ) : null}
    </>
  );
};

export default NewProject;
