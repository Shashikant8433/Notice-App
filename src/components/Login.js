import React, { useRef, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { isUserAvailable, getSingleUser } from "../firebase";
import { toast } from "react-toastify";

export default function Login() {
  const [userFromDB, setUserFromDB] = useState();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const loginDetails = await login(
        emailRef.current.value,
        passwordRef.current.value
      );
      const found = await isUserAvailable(
        loginDetails.user.multiFactor.user.email
      );
      window.localStorage.setItem("docId", found.id);
      history.push("/");
    } catch (e) {
      console.log(e);
      toast.info("Failed to Log in", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }

    setLoading(false);
  }

  return (
    <div>
      <br />
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <br />
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>

            <br />
            <br />
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
