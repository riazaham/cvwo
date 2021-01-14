import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import NewTodo from "../components/NewTodo";
import Todo from "../components/Todo";
import EditTodo from "../components/EditTodo";
import CategoryHome from "../components/CategoryHome";
import NewCategory from "../components/NewCategory";
import EditCategory from "../components/EditCategory";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={CategoryHome} />
      <Route path="/categories" exact component={CategoryHome} />
      <Route path="/categories/new" exact component={NewCategory} />
      <Route path="/categories/:id/edit" exact component={EditCategory} />
      <Route path="/todos" exact component={Home} />
      <Route path="/todos/:id" exact component={Todo} />
      <Route path="/tbd" exact component={NewTodo} />
      <Route path="/todos/:id/edit" exact component={EditTodo} />
    </Switch>
  </Router>
);