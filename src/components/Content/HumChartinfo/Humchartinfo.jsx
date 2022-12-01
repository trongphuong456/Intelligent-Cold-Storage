import React from "react";
import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";

function HumChartInfo(props) {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const { dataChart } = props;

  useEffect(() => {
    const newChartInstance = new Chart(chartRef.current, {
      data: {
        datasets: [
          {
            type: "line",
            label: "Độ ẩm",
            unit: "%RH",
            data: dataChart,
            parsing: {
              yAxisKey: "value",
              xAxisKey: "ts",
            },
            backgroundColor: "blue",
            yAxisID: "y",
            borderColor: "blue",
          },
        ],
      },
      options: {
        interaction: {
          mode: "index",
          intersect: false,
        },
        maintainAspectRatio: false,
        elements: {
          point: {
            radius: 0,
          },
          line: {
            borderWidth: 1,
            tension: 0.2,
          },
        },
        scales: {
          x: {
            type: "time",
            title: {
              display: false,
              text: "Time",
              color: "#191",
              font: {
                family: "Times",
                size: 20,
                style: "normal",
                lineHeight: 1.2,
              },
            },
            time: {
              unit: "hour",
            },
          },
          y: {
            type: "linear",
            display: true,
            position: "left",
            title: {
              display: false,
              text: "Output Energy %RH",
              color: "#038cfc",
              font: {
                family: "Times",
                size: 20,
                style: "normal",
                lineHeight: 1.2,
              },
            },
            ticks: {
              // Include a dollar sign in the ticks
              callback: function (value, index, values) {
                return `${value.toFixed(0)} %RH `;
              },
            },
          },
        },
      },
    });
    setChartInstance(newChartInstance);
    return () => {
      newChartInstance.destroy();
    };
  }, []);

  React.useEffect(() => {
    if (chartInstance) {
      updateDataset(dataChart);
    }
  }, [dataChart]);

  const updateDataset = (dataChart) => {
    chartInstance.data.datasets[0].data = dataChart;
    chartInstance.update();
  };

  return (
    <>
      <div style={{ width: "1100px" }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </>
  );
}

export default HumChartInfo;
