import React from "react";
import Chart from "react-apexcharts";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import maxBy from "lodash/maxBy";
import minBy from "lodash/minBy";
import { metricTypes } from "../../constants";

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
    const { data, configuration, loadingData } = this.props;
    const { unit, metricType, lowerIsBetter } = configuration;

    if (loadingData) {
      return;
    }

    let dataSeriesName;
    let min = minBy(data, "value")?.value - 5;
    let max;
    switch (metricType) {
      case metricTypes.PERCENTAGE:
        dataSeriesName = "%";
        max = Math.min(maxBy(data, "value")?.value + 7, 100);
        break;
      case metricTypes.MONEY:
        dataSeriesName = unit || "€";
        max = maxBy(data, "value")?.value + 5;
        break;
      case metricTypes.TIME:
        dataSeriesName = "Time";
        break;
      default:
        dataSeriesName = "";
    }

    const series = [
      {
        name: dataSeriesName,
        data: data.map((i) => [new Date(i.addedOn).getTime(), i.value]),
      },
    ];

    const options = {
      chart: {
        zoom: {
          enabled: false,
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
            y: Math.min(configuration.limit, configuration.goal),
            y2: Math.max(configuration.limit, configuration.goal),
            strokeDashArray: 0,
            opacity: 0.1,
            fillColor: "yellow",
            borderWidth: 0,
          },
          {
            y: Math.min(configuration.wish, configuration.goal),
            y2: Math.max(configuration.wish, configuration.goal),
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
            y2: lowerIsBetter ? 10000 : 0,
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
          min: min,
          max: max,
          tickAmount: 6,
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
