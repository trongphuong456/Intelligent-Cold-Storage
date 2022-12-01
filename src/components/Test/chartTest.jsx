import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import annotationPlugin from 'chartjs-plugin-annotation';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

ChartActivePower.propTypes = {
  dataChart: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        ts: PropTypes.number.isRequired,
        active_power: PropTypes.number,
        temp: PropTypes.number,
      })
    ),
    value: PropTypes.number.isRequired,
  }).isRequired,
};

function ChartActivePower(props) {
  Chart.register(annotationPlugin);
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const { dataChart } = props;

  const data = {
    datasets: [
      {
        type: 'line',
        unit: 'W',
        label: 'Active power',
        data: dataChart,
        parsing: {
          yAxisKey: 'active_power',
          xAxisKey: 'ts',
        },
        backgroundColor: '#ff3c2e',
        borderColor: '#ff3c2e',
        yAxisID: 'y',
      },
      {
        type: 'line',
        unit: '°C',
        label: 'Temperature',
        data: dataChart,
        parsing: {
          yAxisKey: 'temp',
          xAxisKey: 'ts',
        },
        backgroundColor: '#52c41aa1',
        borderColor: '#52c41aa1',
        yAxisID: 'y1',
      },
    ],
  };

  const chartConfig = {
    data: data,
    options: {
      elements: {
        point: {
          radius: 0,
        },
        line: {
          tension: 0.3,
        },
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false,
      },
      maintainAspectRatio: false,
      plugins: {
        title: {
          text: 'Chart.js Time Scale',
          display: false,
        },
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              var label = context.dataset.label || '';
              var unit = context.dataset.unit;
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += `${parseFloat(context.parsed.y).toLocaleString()} ${unit}`;
              }
              return label;
            },
          },
        },
      },
      scales: {
        x: {
          type: 'time',
          grid: {
            color: '#8B8B8B',
          },
          title: {
            display: false,
            text: 'Time',
            color: '#911',
            font: {
              family: 'Times',
              size: 20,
              weight: 'bold',
              lineHeight: 1.2,
            },
          },
        },
        y: {
          grid: {
            color: '#8B8B8B',
          },

          stacked: true,
          type: 'linear',
          display: true,
          position: 'left',

          title: {
            display: false,
            color: '#191',
            font: {

family: 'Times',
              size: 20,
              style: 'normal',
              lineHeight: 1.2,
            },
          },
          ticks: {
            callback: function (value, index, values) {
              return `${value.toLocaleString()} W`;
            },
          },
          min: 0,
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          title: {
            display: false,
            text: 'Performance Ratio (%)',
            color: '#fcc603',
            font: {
              family: 'Times',
              size: 20,
              style: 'normal',
              lineHeight: 1.2,
            },
          },
          ticks: {
            callback: function (value, index, values) {
              return `${value.toLocaleString()} °C`;
            },
          },
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
          min: 0,
        },
      },
    },
  };

  useEffect(() => {
    if (chartRef && chartRef.current && chartInstance == null) {
      const newChartInstance = new Chart(chartRef.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, []);

  const updateDataset = (listOne) => {
    if (listOne.value === 1) {
      chartInstance.options.scales = {
        x: {
          type: 'time',
          grid: {
            color: '#8B8B8B',
          },
          title: {
            display: false,
            text: 'Time',
            color: '#911',
            font: {
              family: 'Times',
              size: 20,
              weight: 'bold',
              lineHeight: 1.2,
            },
          },
        },
        y: {
          grid: {
            color: '#8B8B8B',
          },

          stacked: true,
          type: 'linear',
          display: true,
          position: 'left',

          title: {
            display: false,
            color: '#191',
            font: {
              family: 'Times',
              size: 20,
              style: 'normal',
              lineHeight: 1.2,
            },
          },
          ticks: {
            callback: function (value, index, values) {
              return `${value.toLocaleString()} W`;
            },
          },
          min: 0,
        },
      };
    } else {
      chartInstance.options.scales = {
        x: {
          type: 'time',
          grid: {
            color: '#8B8B8B',
          },
          title: {
            display: false,
            text: 'Time',
            color: '#911',
            font: {
              family: 'Times',
              size: 20,
              weight: 'bold',
              lineHeight: 1.2,
            },
          },
        },
        y: {
          grid: {
            color: '#8B8B8B',
          },

          stacked: true,
          type: 'linear',
          display: true,
          position: 'left',

          title: {
            display: false,

            color: '#191',
            font: {
              family: 'Times',
              size: 20,
              style: 'normal',
              lineHeight: 1.2,
            },
          },
          ticks: {
            callback: function (value, index, values) {
              return `${value.toLocaleString()} W`;
            },
          },
          min: 0,
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          title: {
            display: false,
            text: 'Performance Ratio (%)',
            color: '#fcc603',
            font: {
              family: 'Times',
              size: 20,
              style: 'normal',
              lineHeight: 1.2,
            },
          },
          ticks: {
            callback: function (value, index, values) {
              return `${value.toLocaleString()} °C `;
            },
          },
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
          min: 0,
        },
      };
    }
    chartInstance.data.datasets = installDataset(listOne);
    chartInstance.update();
  };

  const installDataset = (listOne) => {
    let newList;
    if (listOne.value === 1) {
      newList = [
        {
          type: 'line',
          unit: 'W',
          label: 'active power',
          data: listOne.data,
          parsing: {
            yAxisKey: 'active_power',
            xAxisKey: 'ts',
          },
          backgroundColor: '#ff3c2e',
          borderColor: '#ff3c2e',
          yAxisID: 'y',
        },
      ];
    } else {
      newList = [
        {
          type: 'line',
          unit: 'W',
          label: 'active power',
          data: listOne.data,
          parsing: {
            yAxisKey: 'active_power',
            xAxisKey: 'ts',
          },
          backgroundColor: '#ff3c2e',
          borderColor: '#ff3c2e',
          yAxisID: 'y',
        },
        {
          type: 'line',
          unit: '°C',
          label: 'temperature',
          data: listOne.data,
          parsing: {
            yAxisKey: 'temp',
            xAxisKey: 'ts',
          },
          backgroundColor: '#52c41aa1',
          borderColor: '#52c41aa1',
          yAxisID: 'y1',
        },
      ];
    }

    return newList;
  };

  useEffect(() => {
    if (chartInstance) {
      updateDataset(dataChart);
    }
    console.log(
      'Log: ~ file: ChartActivePower.jsx ~ line 297 ~ ChartActivePower ~ dataChart',
      dataChart
    );
  }, [dataChart]);

  return (
    <div style={{ width: '100%', height: '100%', padding: '10px' }}>
      <canvas ref={chartRef} />
    </div>
  );
}

export default ChartActivePower;