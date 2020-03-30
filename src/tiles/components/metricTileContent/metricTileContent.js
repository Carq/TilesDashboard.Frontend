import React from "react";
import classNames from "classnames";
import {
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";
import PropTypes from "prop-types";
import { metricConfiguration } from "../../propTypes";
import { metricStatuses } from "../../constants";
import "./styles.scss";

class MetricTileContent extends React.Component {
  render() {
    const { current, configuration } = this.props;
    const { metricType, limit, wish, goal } = configuration;
    const metricStatus = this.calculateStatus(current, limit);

    return (
      <div className="metric-tile-content">
        <Table size="small" style={{ width: 200 }}>
          <TableBody>
            {this.renderTableRow("Current", current, metricType, metricStatus)}
            {this.renderTableRow("Limit", limit, metricType)}
            {this.renderTableRow("Goal", goal, metricType)}
            {this.renderTableRow("Wish", wish, metricType)}
          </TableBody>
        </Table>
      </div>
    );
  }

  renderTableRow = (name, value, metricType, metricStatus) => (
    <TableRow key={name}>
      <TableCell align="right">
        <Typography>{name}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography
          className={classNames({
            green: metricStatus && metricStatus === metricStatuses.GREEN,
            amber: metricStatus && metricStatus === metricStatuses.AMBER,
            red: metricStatus && metricStatus === metricStatuses.RED
          })}
        >
          {this.renderValues(value, metricType)}
        </Typography>
      </TableCell>
    </TableRow>
  );

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

  calculateStatus = (current, limit) => {
    if (current * 0.96 > limit) {
      return metricStatuses.GREEN;
    }

    if (current > limit) {
      return metricStatuses.AMBER;
    }

    return metricStatuses.RED;
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
