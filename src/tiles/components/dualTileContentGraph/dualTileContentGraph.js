import React from "react";
import Chart from "react-apexcharts";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import maxBy from "lodash/maxBy";
import minBy from "lodash/minBy";

import "./styles.scss";

class DualTileContentGraph extends React.Component {
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
        name: "PM2.5",
        data: data.map((i) => [new Date(i.addedOn).getTime(), i.primary]),
      },
      {
        name: "PM10",
        data: data.map((i) => [new Date(i.addedOn).getTime(), i.secondary]),
      },
    ];

    let primaryMax = maxBy(data, "primary")?.primary;
    let primaryMin = minBy(data, "primary")?.primary;
    let diff = primaryMax - primaryMin;

    let primaryOffset = 0.5;
    if (diff <= 3) {
      primaryOffset = 5 - diff;
    }

    let secondaryMax = 150;
    let secondaryMin = 0;

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
            y: primaryMax,
            strokeDashArray: 0,
            borderColor: "#705955",
            borderWidth: 2,
            label: {
              text: primaryMax + " PM2.5",
              position: "left",
              borderWidth: 0,
              textAnchor: "start",
              style: {
                background: "#705955",
              },
            },
          },
          {
            y: primaryMin,
            strokeDashArray: 0,
            opacity: 0.2,
            borderColor: "#6E423B",
            borderWidth: 2,
            label: {
              text: primaryMin + " PM2.5",
              borderWidth: 0,
              position: "left",
              textAnchor: "start",
              offsetY: 18,
              style: {
                background: "#6E423B",
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
          min: primaryMin - primaryOffset,
          max: primaryMax + primaryOffset,
          labels: {
            show: true,
          },
        },
        { show: false, min: secondaryMin, max: secondaryMax, tickAmount: 5 },
      ],
      dataLabels: {
        enabled: false,
      },
      colors: ["#705955", "#463836"],
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

DualTileContentGraph.propTypes = {
  data: PropTypes.array.isRequired,
  loadingData: PropTypes.bool,
};

export default DualTileContentGraph;
