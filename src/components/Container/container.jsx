import { useNavigate } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { List } from "@mui/material";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import axiosClient from "../../utils/api";
import Box from "@mui/material/Box";
import Notification from "../Content/Notification/Notification";

import React from "react";
import Content from "../Content/Content";
import "./container.css";

export default function Container() {
  const [token, setToken] = React.useState(
    localStorage.getItem("access token")
  );
  const [entityID, setEntityID] = React.useState([]);
  const [nameID, setNameID] = React.useState([]);
  const [currentWarehouseId, setCurrentWarehouseId] = React.useState(0);
  let currentAlarmData = [];

  const getDevices = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data2 = await axiosClient.get(
      `http://iotmind.ddns.net:9090/api/tenant/devices?pageSize=10&page=0&sortProperty=label&sortOrder=DESC\n`,
      config
    ); // device- controller
    var deviceID = [];
    var nameID = [];
    data2.data.data.map((data) => {
      deviceID.push(data.id.id);
      nameID.push(data.name);
    });
    setEntityID(deviceID);
    setNameID(nameID);
  };

  React.useEffect(() => {
    getDevices();
  }, []);

  React.useEffect(() => {
    const getToken = async () => {
      var authData = {
        username: "nguyentrongphuong99hbl@gmail.com",
        password: "123456",
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const tokenResponse = await axiosClient.post(
        "http://iotmind.ddns.net:9090/api/auth/login", // login-endpoint
        authData,
        config
      );
      const content = await tokenResponse.json();
      setToken(content.token);
      localStorage.setItem("access token", content.token);
    };
    var timer;
    timer = setInterval(() => {
      getToken();
    }, 3600000);
    return () => {
      clearInterval(timer);
    };
  }, [token]);

  const [openNoti, setOpenNoti] = React.useState(false);
  const [storageID, setStorageID] = React.useState("");

  React.useEffect(() => {
    const getTotalAlarm = async (token) => {
      var myHeaders = new Headers();
      myHeaders.append("X-Authorization", `Bearer ${token}`);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      for (var i = 1; i <= entityID.length; i++) {
        const data2 = await fetch(
          `http://iotmind.ddns.net:9090/api/alarm/DEVICE/${
            entityID[i - 1]
          }?pageSize=1&page=0&fetchOriginator=true\n`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result2) => {
            if (
              typeof currentAlarmData[i - 1] !== "undefined" &&
              result2.totalElements > currentAlarmData[i - 1]
            ) {
              setOpenNoti(true);
              setStorageID(i);
            }
            currentAlarmData[i - 1] = result2.totalElements;
          })
          .catch((error) => console.log("error", error));
      }
    };
    var timer;
    if (token && token !== "") {
      timer = setInterval(() => {
        getTotalAlarm(token);
      }, 30000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [token]);

  const warehouseContentDisplay = (id) => {
    return (
      <Content warehouseId={id + 1} deviceId={entityID[id]} token={token} />
    );
  };

  let navigate = useNavigate();
  let logout = () => {
    localStorage.removeItem("access token");
    navigate("/");
  };
  return (
    <div id="Container">
      <div className="b-c-bl">
        <div className="d-f center header">
          <div className="d-f pd">
            <img
              src="http://www.iotmind.vn/bitrix/templates/iotmind/img/MIND/logo_mind.png"
              alt="logo"
            />
            <div>
              <h1>INTELLIGENT COLD STORAGE MANAGEMENT</h1>
              <h3>MIND . TECHNOLOGY CO., LTD</h3>
            </div>
          </div>
          <div className="header-btn">
            <button onClick={logout}>Log Out</button>
          </div>
        </div>
      </div>
      <div className="b-c-sm">
        <div className="center">
          <ul className=" d-f nav">
            <li>
              <a href="/home">HOME</a>
            </li>
            <li>
              <a href="#MONITORING">MONITORING BOARD</a>
              <ul className="subnav">
                <li>TEMPERATURE</li>
                <li>HUMIDITY</li>
              </ul>
              <i className="ti-arrow-circle-down header-icon"></i>
            </li>
            <li>
              <a href="#DASHBOARD">DASHBOARD</a>
            </li>
            <li>
              <a href="#WARNING">WARNING TABLE</a>
            </li>
            <li>
              WAREHOUSE
              <ul className="subnav">
                <li>
                  <List>
                    {nameID.map((text, index) => (
                      <ListItem
                        button
                        key={text}
                        onClick={() => {
                          setCurrentWarehouseId(index);
                        }}
                      >
                        <ListItemIcon>
                          <WarehouseIcon />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItem>
                    ))}
                  </List>
                </li>
              </ul>
              <i className="ti-arrow-circle-down header-icon"></i>
            </li>
            <li>
              <button className="btn-container" onClick={getDevices}>
                {" "}
                UPDATE{" "}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <Box>
          {warehouseContentDisplay(currentWarehouseId)}
          <Notification
            openNoti={openNoti}
            storageID={storageID}
            setOpenNoti={setOpenNoti}
          />
        </Box>
      </div>
    </div>
  );
}
