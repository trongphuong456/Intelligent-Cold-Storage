import React, { useEffect, useState } from "react";
import axiosClient from "../../utils/api";
import DatePickerComponent from "./Datepicker/datepicker";
import TempDisplayChart from "./TempDisplayChart/TempDisplayChart";
import HumDisplayChart from "./HumDisplayChart/HumDisplayChart";
import HumChartinfo from "./HumChartinfo/Humchartinfo";
import TempChartinfo from "./TempChartinfo/Tempchartinfo";
import TableDisplay from "./TableDisplay/TableDisplay";
import ChartActivePower from "../Test/chartTest";
import "./Content.css";
import Control from "./Control/Control";
import moment from "moment";

import { Grid, Paper } from "@mui/material";

// import { useState, useEffect } from 'react';
export default function Content(props) {
  const [alarmTotal, setAlarmTotal] = React.useState();
  const [dataTable, setDataTable] = useState();
  const [totalPageAlarm, setTotalPageAlarm] = useState();
  const [pageSelect, setPageSelect] = useState(1);
  const [datePicker, setDatePicker] = React.useState();
  const [dataChart, setDataChart] = React.useState([]);
  const { warehouseId, deviceId, token } = props;
  const [currentData, setCurrentData] = React.useState({
    temp: 0,
    hum: 0,
  });

  useEffect(() => {
    const getCurrentData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      var keys = "temperature,humidity";
      const data = await axiosClient.get(
        `http://iotmind.ddns.net:9090/api/plugins/telemetry/DEVICE/${deviceId}/values/timeseries?keys=${keys}&useStrictDataTypes=true`,
        config
      ); //
      if (data !== null) {
        var temp = data.data.temperature[0].value;
        var hum = data.data.humidity[0].value;
        setCurrentData((prevState) => ({
          ...prevState,
          temp: temp,
          hum: hum,
        }));
      }
    };
    var timer;
    if (token && token !== "") {
      getCurrentData();
      timer = setInterval(getCurrentData, 60000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [token, deviceId]);

  const getTimeSeriesData = async (deviceId, startTime, endTime) => {
    var keys = "temperature,humidity";
    var myHeaders = new Headers();
    myHeaders.append("X-Authorization", `Bearer ${token}`);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data1 = await axiosClient.get(
      `http://iotmind.ddns.net:9090/api/plugins/telemetry/DEVICE/${deviceId}/values/timeseries?keys=${keys}&startTs=${startTime}&endTs=${endTime}\n`,
      config
    );
    console.log(data1.data);
    if (data1.data) {
      setDataChart(data1.data);
    } else {
      dataChart = [];
    }
  };

  useEffect(() => {
    (async () => {
      if (token && deviceId) {
        let startTime;
        let endTime;

        if (!datePicker) {
          endTime = moment().valueOf();
          startTime = endTime - 24 * 3600 * 1000;
        } else {
          endTime = moment(datePicker).valueOf();
          startTime = endTime - 24 * 3600 * 1000;
        }
        await getTimeSeriesData(deviceId, startTime, endTime);
      }
    })();
  }, [token, datePicker, deviceId]);

  const formatData0 = (object) => {
    console.log(object);
    return object[Object.keys(object)[0]];
  };
  const formatData1 = (object) => {
    return object[Object.keys(object)[1]];
  };

  // ------------------- ALARM---------------------

  const reloadAlarmtable = async () => {
    var myHeaders = new Headers();
    myHeaders.append("X-Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const data2 = await fetch(
      `http://iotmind.ddns.net:9090/api/alarm/DEVICE/${deviceId}?pageSize=10&page=${
        pageSelect - 1
      }&sortProperty=createdTime&sortOrder=DESC&fetchOriginator=true\n`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result3) => {
        // console.log(result3)
        setAlarmTotal(result3.data);
        var dataNew = result3.data;
        setDataTable(dataNew);
        // setDataChart
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    const reloadAlarmtable = async () => {
      var myHeaders = new Headers();
      myHeaders.append("X-Authorization", `Bearer ${token}`);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      const data2 = await fetch(
        `http://iotmind.ddns.net:9090/api/alarm/DEVICE/${deviceId}?pageSize=10&page=${
          pageSelect - 1
        }&sortProperty=startTs&sortOrder=DESC&fetchOriginator=true\n`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result3) => {
          setTotalPageAlarm(result3.totalPages);
          setAlarmTotal(result3.data);
          var dataNew = result3.data;
          setDataTable(dataNew);
        })
        .catch((error) => console.log("error", error));
    };
    if (token !== "") {
      reloadAlarmtable();
    }
  }, [token, deviceId, pageSelect]);

  var alarmID = [];
  if (alarmTotal !== undefined) {
    alarmTotal.map((alarmTotal) => {
      alarmID.push(alarmTotal.id.id);
    });
  }

  // Ack and clear Alarm

  const ackandclearAlarm = async () => {
    var myHeaders = new Headers();
    myHeaders.append("X-Authorization", `Bearer ${token}`);

    if (alarmID !== undefined) {
      for (var i = 0; i < alarmID.length; i++) {
        const ackAlarm = await fetch(
          `http://iotmind.ddns.net:9090/api/alarm/${alarmID[i]}/ack`,
          {
            method: "POST",
            headers: myHeaders,
          }
        );
        const result = await ackAlarm.text();
        const clearAlarm = await fetch(
          `http://iotmind.ddns.net:9090/api/alarm/${alarmID[i]}/clear`,
          {
            method: "POST",
            headers: myHeaders,
          }
        );
        const result2 = await clearAlarm.text();
      }
    }
  };

  return (
    <div>
      <DatePickerComponent
        setDatePicker={setDatePicker}
        warehouseId={warehouseId}
      />
      <div className="chart">
        <h2 id="MONITORING">MONITORING BOARD</h2>
        <div className="monitoring-chart">
          <Grid item xs={12}>
            <Paper elevation={4} style={{ padding: "20px" }}>
              <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={2}>
                  <TempDisplayChart currentData={currentData} />
                </Grid>
                <TempChartinfo dataChart={formatData0(dataChart)} />
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={4} style={{ padding: "20px" }}>
              <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={2}>
                  <HumDisplayChart currentData={currentData} />
                </Grid>
                <HumChartinfo dataChart={formatData1(dataChart)} />
              </Grid>
            </Paper>
          </Grid>
        </div>
      </div>
      <div className="dashboard">
        <Grid item xs={12}>
          <Control token={token}></Control>
        </Grid>
      </div>
      <div className="alarm-container">
        <h2 id="WARNING"> WARNING TABLE</h2>
        <Grid item xs={12}>
          <Paper elevation={4} style={{ padding: "10px" }}>
            <TableDisplay
              totalPageAlarm={totalPageAlarm}
              dataTable={dataTable}
              setPageSelect={setPageSelect}
            />
            <button
              className="btn-alarm"
              onClick={() => {
                ackandclearAlarm();
              }}
            >
              CLEAR AND ACKNOWLEDGE
            </button>

            <button
              className="btn-alarm btn-alarmTable"
              onClick={() => {
                reloadAlarmtable();
              }}
            >
              RELOAD TABLE
            </button>
          </Paper>
        </Grid>
      </div>
    </div>
  );
}
