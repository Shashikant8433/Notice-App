import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "react-bootstrap";
import { getSingleUser, updateNotice } from "../firebase";

export default function Dashboard() {
  const [DBuser, setDBuser] = useState();
  const { getAllNotices } = useAuth();
  const [notices, setNotices] = useState([]);
  const [currentNotice, setCurrentNotice] = useState("");
  const [activeText, setActiveText] = useState(null);

  useEffect(() => {
    (async function () {
      const user = await getSingleUser(window.localStorage.getItem("docId"));
      console.log({ user });
      setDBuser(user);
    })();
  }, []);

  useEffect(() => {
    (async function () {
      const notices = await getAllNotices();
      console.log(await notices);
      setNotices(await notices);
    })();
  }, []);

  console.log(currentNotice);
  return (
    <>
      <h2 className="text-center mb-4">Dashboard</h2>
      <table style={{ width: "90vw" }}>
        <tbody>
          <tr className="text-center mb-4">
            <th>Notices</th>
            <th>Editors</th>
          </tr>
          {notices.map((doc) => {
            return (
              <tr
                key={doc.id}
                style={{ height: "200px", border: "1px solid black" }}
              >
                <td style={{ width: "60vw", borderRight: "1px solid black" }}>
                  {DBuser.role === "user" ? (
                    <textarea
                      style={{
                        resize: "none",
                        width: "100%",
                        height: "140px",
                        border: "none",
                      }}
                      readOnly
                      defaultValue={doc.notice}
                    />
                  ) : (
                    <textarea
                      style={{
                        resize: "none",
                        width: "100%",
                        height: "140px",
                        border: "none",
                      }}
                      onClick={(e) => {
                        setActiveText(doc.id);
                        setCurrentNotice(e.target.value);
                      }}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setCurrentNotice(e.target.value);
                      }}
                      value={activeText === doc.id ? currentNotice : doc.notice}
                    />
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
                      }}
                      disabled={DBuser.role === "user" ? true : false}
                    >
                      submit
                    </Button>
                  )}
                </td>
                <td
                  style={{
                    overflowY: "scroll",
                    height: "150px",
                    width: "30vw",
                  }}
                >
                  <ol style={{ height: "150px" }}>
                    {doc.editors.map((editor, index) => {
                      return (
                        <li key={editor.editTime}>
                          <p style={{ margin: "0px" }}>
                            Edited by {editor.editedBy}{" "}
                          </p>
                          <p style={{ margin: "0px" }}>
                            at{" "}
                            {editor.editTime
                              .toDate()
                              .toString()
                              .substring(
                                0,
                                editor.editTime.toDate().toString().length - 34
                              )}
                          </p>
                          {/*  */}
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
