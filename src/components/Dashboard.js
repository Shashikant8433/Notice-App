import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button, Form } from "react-bootstrap";
import { getSingleUser, updateNotice } from "../firebase";

export default function Dashboard() {
  const [DBuser, setDBuser] = useState();
  const { getAllNotices } = useAuth();
  const [notices, setNotices] = useState([]);
  const [currentNotice, setCurrentNotice] = useState("");
  const [activeText, setActiveText] = useState(null);
  const [isUpdate, setIsUpdate] = useState("");

  useEffect(() => {
    (async function () {
      const user = await getSingleUser(window.localStorage.getItem("docId"));
      setDBuser(user);
    })();
  }, []);

  useEffect(() => {
    (async function () {
      const notices = await getAllNotices();
      setNotices(notices);
    })();
  }, [isUpdate, getAllNotices]);

  return (
    <>
      <h2 className="text-center mb-4">Dashboard</h2>
      <table style={{ width: "95vw" }}>
        <tbody>
          <tr className="text-center mb-4">
            <th>Notices</th>
            <th>Editors</th>
          </tr>
          {notices.map((doc) => {
            return (
              <tr
                key={doc.id}
                style={{
                  height: "200px",
                  borderBottom: "1px solid black",
                  borderTop: "1px solid black",
                }}
              >
                <td style={{ width: "60vw" }}>
                  {DBuser.role === "user" ? (
                    <Form>
                      <Form.Control
                        as="textarea"
                        style={{
                          resize: "none",
                          width: "100%",
                          height: "140px",
                        }}
                        readOnly
                        defaultValue={doc.notice}
                      ></Form.Control>
                    </Form>
                  ) : (
                    <Form>
                      <Form.Control
                        as="textarea"
                        style={{
                          resize: "none",
                          width: "100%",
                          height: "140px",
                        }}
                        onClick={(e) => {
                          setActiveText(doc.id);
                          setCurrentNotice(e.target.value);
                        }}
                        onChange={(e) => {
                          setCurrentNotice(e.target.value);
                        }}
                        value={
                          activeText === doc.id ? currentNotice : doc.notice
                        }
                      ></Form.Control>
                    </Form>
                  )}
                  {activeText === doc.id && (
                    <Button
                      onClick={() => {
                        const currentTime = new Date();
                        const noticeDocNew = {
                          editors: [
                            ...doc.editors,
                            {
                              editedBy: DBuser.name,
                              editTime: currentTime,
                            },
                          ],
                          notice: currentNotice,
                        };
                        updateNotice(doc.id, noticeDocNew);
                        setIsUpdate(doc.id);
                      }}
                      disabled={DBuser.role === "user" ? true : false}
                    >
                      Update
                    </Button>
                  )}
                </td>
                <td
                  style={{
                    overflowY: "scroll",
                    height: "150px",
                    width: "35vw",
                  }}
                >
                  <ol
                    style={{
                      height: "150px",
                      listStyle: "none",
                      margin: "5px",
                      padding: "5px",
                    }}
                  >
                    {[...doc.editors].reverse().map((editor, index) => {
                      return (
                        <li key={editor.editTime}>
                          <p
                            style={{
                              margin: "2px",
                              borderBottom: "1px solid gray",
                            }}
                          >
                            Edited by {editor.editedBy} at{" "}
                            {editor.editTime
                              .toDate()
                              .toString()
                              .substring(
                                0,
                                editor.editTime.toDate().toString().length - 31
                              )}
                          </p>
                        </li>
                      );
                    })}
                  </ol>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
