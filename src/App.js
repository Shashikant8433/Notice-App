import AppNav from "./components/AppNav";
import React from "react";
import Signup from "./components/Signup";
import { Container } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function App() {
  return (
    <>
      <AppNav />
      <Container className="d-flex align-items-center justify-content-center">
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/user" component={Profile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </Container>
    </>
  );
}

export default App;
