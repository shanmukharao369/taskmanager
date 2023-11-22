import NavBar from "./components/NavBar";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskDetails from "./components/TaskDetails";
import TaskProvider from "./Store/TaskProvider";

function App() {
  return (
    <TaskProvider>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Redirect to="/tasklist" />
        </Route>
        <Route exact path="/tasklist">
          <TaskList />
        </Route>
        <Route exact path="/taskdetails">
          <TaskDetails />
        </Route>
      </Switch>
    </TaskProvider>
  );
}

export default App;
