import React from "react";
import { Box, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { metricConfiguration } from "../../propTypes";
import "./styles.css";

class MetricTileContent extends React.Component {
  render() {
    const { current, configuration } = this.props;

    return (
      <React.Fragment>
        <Typography color="textSecondary" component="span">
          <Box>
            Current: {this.renderValues(current, configuration.metricType)}
          </Box>
          <Box>
            Limit:{" "}
            {this.renderValues(configuration.limit, configuration.metricType)}
          </Box>
          <Box>
            Goal:{" "}
            {this.renderValues(configuration.goal, configuration.metricType)}
          </Box>
          <Box>
            Wish:{" "}
            {this.renderValues(configuration.wish, configuration.metricType)}
          </Box>
        </Typography>
      </React.Fragment>
    );
  }

  renderValues = (value, valueType) => {
    if (value === undefined || value === null) {
      return "-";
    }

    switch (valueType) {
      case "percentage":
        return `${value}%`;
      case "money":
        return `${value}€`;
      case "time":
        return this.getFormatedTime(value);
      default:
        return value;
    }
  };

  getFormatedTime = totalSeconds => {
    const format = val => `${Math.floor(val)}`.slice(-2);
    const hours = format(totalSeconds / 3600);
    const minutes = format((totalSeconds % 3600) / 60);
    const seconds = format(totalSeconds % 60);

    let finalFormat = hours > 0 ? `${hours}h ` : "";
    finalFormat += minutes > 0 ? `${minutes}m ` : "";
    finalFormat += seconds > 0 ? `${seconds}s ` : "";

    return finalFormat;
  };
}

MetricTileContent.propTypes = {
  current: PropTypes.number.isRequired,
  configuration: metricConfiguration
};

export default MetricTileContent;
