import React, { useState } from "react";
import "./Login.css";
import "./font/themify-icons/themify-icons.css";
import { useNavigate } from "react-router-dom";
import logo from "./img/logo_mind.png";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import "toastifier/dist/toastifier.min.css";
import toastifier from "toastifier";
// import { AiOutlineUser, RiLockPasswordLine } from "react-icons/fa";
<script
  src="https://kit.fontawesome.com/a076d05399.js"
  crossorigin="anonymous"
></script>;

function LoginApp({ onSubmit }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [valuePassword, setValuePassword] = useState("");

  const usernameRef = React.useRef();
  const passwordRef = React.useRef();
  const HandleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    onSubmit(data);
  };

  // localStorage.setItem("access token", content.token);
  // localStorage.getItem("access") => Do something

  return (
    <div class="body-center">
      <div class="center-login">
        <div className="form-img">
          <img src={logo} className="logo" alt="" />
        </div>
        <h2>WELCOME</h2>
        <form method="post" onSubmit={HandleSubmit}>
          <div class="txt_field">
            <input
              type="text"
              required
              id="username"
              ref={usernameRef}
              value={valueInput}
              onChange={(e) => setValueInput(e.target.value)}
              onMouseEnter={() => {
                if (valueInput === "") {
                  setUsername("focus");
                }
              }}
              onMouseLeave={() => {
                if (valueInput === "") {
                  setUsername("");
                }
              }}
            />
            <span></span>
            <label for={username}>
              <AiOutlineUser />
              &nbsp; Username
            </label>
          </div>
          <div class="txt_field">
            <input
              type="password"
              required
              id="password"
              ref={passwordRef}
              value={valuePassword}
              onChange={(e) => setValuePassword(e.target.value)}
              onMouseEnter={() => setPassword("focus")}
              onMouseLeave={() => {
                if (valuePassword === "") {
                  setPassword("");
                }
              }}
            />
            <span></span>
            <label for={password}>
              <RiLockPasswordLine />
              &nbsp; Password
            </label>
          </div>
          <input type="submit" value="Login " />
        </form>
      </div>
    </div>
  );
}
const Login = () => {
  let navigate = useNavigate();
  const HandleSubmit = (data) => {
    if (data.username === "admin" && data.password === "123456") {
      // routing to ... /mainDashBoard (localhost:3000/mainDashBoard)

      const getToken = async () => {
        var authData = {
          username: "nguyentrongphuong99hbl@gmail.com",
          password: "123456",
        };
        const tokenResponse = await fetch(
          "http://iotmind.ddns.net:9090/api/auth/login",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(authData),
          }
        );
        const content = await tokenResponse.json();
        localStorage.setItem("access token", content.token);
        if (localStorage.getItem("access token") !== null) {
          navigate("/home");
        } else {
          navigate("/home");
        }
      };
      getToken();
    } else {
      toastifier("Incorrect account or password. Please try again", {
        type: "error",
        position: "top-right",
      });
    }
  };
  return (
    <div>
      <LoginApp onSubmit={HandleSubmit} />
    </div>
  );
};

export default Login;
