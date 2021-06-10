import React from "react";
import { BsFillHeartFill } from "react-icons/bs";

function Footer(props) {
  return (
    <h1 style={{ textAlign: "center", marginTop: "3rem" }}>
      Made with {<BsFillHeartFill size={10}></BsFillHeartFill>} by{" "}
      <a
        style={{ textDecoration: "none", color: "blue" }}
        href="https://elbi.vercel.app"
      >
        Rhafael Bijaksana
      </a>
    </h1>
  );
}

export default Footer;
