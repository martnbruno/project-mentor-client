import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Projects from "./components/projects/Projects";
import SignIn from "./components/auth/SignIn";
import Register from "./components/auth/Register";
import ProjectState from "./context/projects/ProjectState";
import TaskState from "./context/tasks/TaskState";
import AlertState from "./context/alerts/AlertState";
import AuthState from "./context/auth/AuthState";
import tokenAuth from "./config/tokenAuth";
import PrivateRoute from "./components/routes/PrivateRoute";

// Check if there is a token, in order to keep session active even after refresh.
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={SignIn} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path="/projects" component={Projects} />
              </Switch>
            </Router>
          </AuthState>
        </AlertState>
      </TaskState>
    </ProjectState>
  );
}

export default App;
