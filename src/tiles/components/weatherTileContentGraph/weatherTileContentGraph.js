import React from "react";
import Chart from "react-apexcharts";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";

import "./styles.scss";

class WeatherTileContentGraph extends React.Component {
  render() {
    const { series, loadingSeries } = this.props;
    const options = {
      chart: {
        sparkline: {
          enabled: true,
        },
        zoom: {
          autoScaleYaxis: true,
        },
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: [
        { show: false, min: 10, max: 30 },
        { show: false, min: 20, max: 100 },
      ],
      colors: ["#ff6600", "#99ccff"],
      fill: {
        type: "solid",
        opacity: [0.5, 0.6],
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
      <React.Fragment>
        {loadingSeries && (
          <div className="weather-tile-graph">
            <CircularProgress size={60} thickness={5} />
          </div>
        )}
        {!loadingSeries && (
          <Chart
            options={options}
            series={series}
            type="area"
            height="100%"
            width="100%"
          />
        )}
      </React.Fragment>
    );
  }
}

WeatherTileContentGraph.propTypes = {
  series: PropTypes.array.isRequired,
  loadingSeries: PropTypes.bool,
};

export default WeatherTileContentGraph;
