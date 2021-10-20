import React from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function AppNav() {
  const history = useHistory();
  const { currentUser, logout } = useAuth();
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={() => history.push("/")}
        >
          ValueEnable
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <>
            {currentUser && (
              <Nav className=" text-center">
                <Button
                  variant="link"
                  style={{
                    color: "rgba(255,255,255,.55)",
                    textDecoration: "none",
                    outlineColor: "transparent",
                  }}
                  onClick={() => history.push("/dashboard")}
                >
                  Dashboard
                </Button>
              </Nav>
            )}
          </>
          <Nav className="text-center">
            <>
              {currentUser && (
                <Button
                  variant="link"
                  style={{
                    color: "rgba(255,255,255,.55)",
                    textDecoration: "none",
                    outlineColor: "transparent",
                  }}
                  onClick={() => history.push("/user")}
                >
                  User
                </Button>
              )}
            </>
            <>
              {currentUser ? (
                <Button
                  variant="link"
                  style={{
                    color: "rgba(255,255,255,.55)",
                    textDecoration: "none",
                    outlineColor: "transparent",
                  }}
                  onClick={() => {
                    console.log("clicked");
                    logout();
                    history.push("/");
                  }}
                >
                  Log Out
                </Button>
              ) : (
                <Link
                  to="/login"
                  style={{
                    color: "rgba(255,255,255,.55)",
                    textDecoration: "none",
                  }}
                >
                  Log in
                </Link>
              )}
            </>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
