import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

const getData = (dataCurrent) => {
  return [
    ["Label", "Value"],
    ["Temperature", dataCurrent],
  ];
};

const options = {
  min: -20,
  max: 30,
  width: 400,
  height: 200,
  redFrom: 20,
  redTo: 30,
  yellowFrom: 15,
  yellowTo: 20,
  minorTicks: 5,
};

const TempDisplayChart = ({ currentData }) => {
  const [data, setData] = useState();

  useEffect(() => {
    if (currentData.temp !== null) {
      setData(getData(currentData.temp));
    } else {
      setData(getData(0));
    }
  }, [currentData]);

  return (
    <div id="TempDisplayChart">
      <div className="tempDisplayChart-section">
        <Chart
          chartType="Gauge"
          width="100px"
          height="100px"
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default TempDisplayChart;
