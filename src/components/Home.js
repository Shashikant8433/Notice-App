import React from "react";
import back from "../assets/home.svg";
export default function Home() {
  return (
    <>
      <div
        style={{
          textAlign: "center",
          fontSize: "2rem",
        }}
      >
        Notice for Every One
        <p style={{ fontSize: "16px" }}>
          <strong>NOTE: Login to access dashboard</strong>
        </p>
      </div>
      <div
        style={{
          backgroundImage: `url(${back})`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          width: "90vw",
          height: "90vh",
          position: "fixed",
          top: "100px",
          left: "5vw",
          zIndex: "-1",
        }}
      ></div>
    </>
  );
}
