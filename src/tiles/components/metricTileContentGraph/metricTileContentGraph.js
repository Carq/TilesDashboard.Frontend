import React from "react";
import Chart from "react-apexcharts";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";

import "./styles.scss";

class MetricTileContentGraph extends React.Component {
  render() {
    const { loadingData } = this.props;

    return (
      <React.Fragment>
        {loadingData && (
          <div className="metric-tile-graph">
            <CircularProgress size={60} thickness={5} />
          </div>
        )}
        {loadingData === false && this.renderChart()}
      </React.Fragment>
    );
  }

  renderChart = () => {
    const { data, configuration } = this.props;

    const series = [
      {
        name: "Code Coverage",
        data: data.map((i) => [new Date(i.addedOn).getTime(), i.value]),
      },
    ];

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
      stroke: {
        curve: "smooth",
      },
      colors: ["#ff6600"],
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
            y: configuration.limit,
            y2: configuration.goal,
            strokeDashArray: 0,
            opacity: 0.1,
            fillColor: "yellow",
            borderWidth: 0,
          },
          {
            y: configuration.goal,
            y2: configuration.wish,
            strokeDashArray: 0,
            opacity: 0.2,
            fillColor: "lightgreen",
            borderWidth: 0,
          },
          {
            y: configuration.wish,
            strokeDashArray: 0,
            opacity: 0.2,
            borderColor: "lightgreen",
          },
          {
            y: configuration.limit,
            y2: 0,
            strokeDashArray: 0,
            opacity: 0.2,
            fillColor: "tomato",
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
          show: true,
          tickAmount: 5,
          min: configuration.limit - 10,
          max: 100,
          forceNiceScale: true,
          labels: {
            show: true,
          },
        },
      ],
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      tooltip: {
        x: {
          format: "dd MMM",
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
        type="line"
        height="100%"
        width="100%"
      />
    );
  };
}

MetricTileContentGraph.propTypes = {
  data: PropTypes.array.isRequired,
  configuration: PropTypes.object.isRequired,
  loadingData: PropTypes.bool,
};

export default MetricTileContentGraph;
