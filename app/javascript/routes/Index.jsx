import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TodoHome from "../components/TodoHome";
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
      <Route path="/categories/:category_id/todos" exact component={TodoHome} />
      <Route path="/categories/:category_id/todos/new" exact component={NewTodo} />
      <Route path="/categories/:category_id/todos/:id" exact component={Todo} />
      <Route path="/categories/:category_id/todos/:id/edit" exact component={EditTodo} />
    </Switch>
  </Router>
);