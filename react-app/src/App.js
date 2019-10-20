import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.scss";
import NewTable from "./components/NewTable/NewTable";
import Table from "./components/table/Table";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/new">
            <NewTable />
          </Route>
          <Route path="/table/:id" children={<Table />} />
          <Route path="/">
            <Link to="/new">New table</Link>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
