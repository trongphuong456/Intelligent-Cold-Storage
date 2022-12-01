import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

const getData = (dataCurrent) => {
  return [
    ["Label", "Value"],
    ["Humdity", dataCurrent],
  ];
};

const options = {
  width: 400,
  height: 200,
  redFrom: 60,
  redTo: 100,
  yellowFrom: 40,
  yellowTo: 60,
  minorTicks: 5,
};

const HumDisplayChart = ({ currentData }) => {
  const [data, setData] = useState();

  useEffect(() => {
    if (currentData.hum !== null) {
      setData(getData(currentData.hum));
    } else {
      setData(getData(0));
    }
  }, [currentData]);

  return (
    <Chart
      chartType="Gauge"
      width="100px"
      height="100px"
      data={data}
      options={options}
    />
  );
};

export default HumDisplayChart;
