import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import NewTodo from "../components/NewTodo";
import Todo from "../components/Todo";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/todos" exact component={Home} />
      <Route path="/todos/:id" exact component={Todo} />
      <Route path="/new_todo" exact component={NewTodo} />
    </Switch>
  </Router>
);