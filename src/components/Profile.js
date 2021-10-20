import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { getSingleUser } from "../firebase";
import { toast } from "react-toastify";

export default function Profile() {
  const [DBuser, setDBuser] = useState();
  const { logout } = useAuth();
  const history = useHistory();

  useEffect(() => {
    (async function () {
      const user = await getSingleUser(window.localStorage.getItem("docId"));
      console.log(user);
      setDBuser(user);
    })();
  }, []);

  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch (e) {
      console.log(e);
      toast.info("Failed to log out", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }

  return (
    <>
      <br />
      <Card>
        <Card.Body className="text-center">
          <h2 className="text-center mb-4">Profile</h2>
          <div className="w-100">
            <img
              height="100"
              width="100"
              style={{ clipPath: "circle(46.1% at 51% 47%)" }}
              alt="user profile"
              src="https://matte-strap.netlify.app/assets/avatar.png"
            />
          </div>
          <strong>Name: </strong>
          {DBuser?.name}
          <br />
          <strong>Email:</strong> {DBuser?.email}
          <br />
          <strong>Role:</strong> {DBuser?.role}
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
