import React from "react";
import Chart from "react-apexcharts";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import maxBy from "lodash/maxBy";
import minBy from "lodash/minBy";

import "./styles.scss";

class WeatherTileContentGraph extends React.Component {
  render() {
    const { loadingData } = this.props;

    return (
      <React.Fragment>
        {loadingData && (
          <div className="weather-tile-graph">
            <CircularProgress size={60} thickness={5} />
          </div>
        )}
        {loadingData === false && this.renderChart()}
      </React.Fragment>
    );
  }

  renderChart = () => {
    const { data } = this.props;

    const series = [
      {
        name: "Temperature",
        data: data.map((i) => [new Date(i.addedOn).getTime(), i.temperature]),
      },
      {
        name: "Humidity",
        data: data.map((i) => [new Date(i.addedOn).getTime(), i.humidity]),
      },
    ];

    let tempMax = maxBy(data, "temperature")?.temperature;
    let tempMin = minBy(data, "temperature")?.temperature;
    let diff = tempMax - tempMin;

    let tempOffset = 0.5;
    if (diff <= 3) {
      tempOffset = 5 - diff;
    }

    let humidityMax = 105;
    let humidityMin = 10;

    const options = {
      chart: {
        zoom: {
          enabled: false,
          autoScaleYaxis: true,
        },
        toolbar: {
          show: false,
        },
      },
      grid: {
        show: true,
        borderColor: "#747474",
        strokeDashArray: 0,
        row: {
          colors: ["#b6b6b6", "#747474"],
          opacity: 0.1,
        },
      },
      annotations: {
        position: "back",
        yaxis: [
          {
            y: tempMax,
            strokeDashArray: 0,
            borderColor: "mediumvioletred",
            borderWidth: 2,
            label: {
              text: tempMax + "°C",
              position: "left",
              borderWidth: 0,
              textAnchor: "start",
              style: {
                background: "mediumvioletred",
              },
            },
          },
          {
            y: tempMin,
            strokeDashArray: 0,
            opacity: 0.2,
            borderColor: "lightgreen",
            borderWidth: 2,
            label: {
              text: tempMin + "°C",
              borderWidth: 0,
              position: "left",
              textAnchor: "start",
              offsetY: 18,
              style: {
                background: "darkgreen",
              },
            },
          },
        ],
      },
      xaxis: {
        type: "datetime",
        labels: {
          datetimeUTC: false,
        },
        axisTicks: {
          show: true,
        },
      },
      yaxis: [
        {
          show: false,
          tickAmount: 5,
          min: tempMin - tempOffset,
          max: tempMax + tempOffset,
          labels: {
            show: true,
          },
        },
        { show: false, min: humidityMin, max: humidityMax, tickAmount: 5 },
      ],
      dataLabels: {
        enabled: false,
      },
      colors: ["#ff6600", "#99ccff"],
      fill: {
        type: "solid",
        opacity: [0.05, 0.05],
      },
      legend: {
        show: false,
      },
      tooltip: {
        x: {
          format: "HH:mm",
        },
      },
      theme: {
        mode: "dark",
      },
    };

    return (
      <Chart
        options={options}
        series={series}
        type="area"
        height="100%"
        width="100%"
      />
    );
  };
}

WeatherTileContentGraph.propTypes = {
  data: PropTypes.array.isRequired,
  loadingData: PropTypes.bool,
};

export default WeatherTileContentGraph;
