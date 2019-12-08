import React from "react";
import moment from "moment";
import {
  Button,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography
} from "@material-ui/core";
import PropTypes from "prop-types";
import "./styles.css";

class MetricTile extends React.Component {
  render() {
    const { name, current, limit, goal, wish, lastUpdated, type } = this.props;

    return (
      <Card className="card">
        <CardHeader title={name} />
        <CardContent>
          <Typography color="textSecondary" component="span">
            <Box>Current: {this.renderValues(current, type)}</Box>
            <Box>Limit: {this.renderValues(limit, type)}</Box>
            <Box>Goal: {this.renderValues(goal, type)}</Box>
            <Box>Wish: {this.renderValues(wish, type)}</Box>
            <Box
              mt={1}
              color="text.hint"
              fontSize={12}
              textAlign="left"
              top={100}
            >
              Last updated:{" "}
              {lastUpdated && moment(lastUpdated).format("HH:mm DD.MM.YYYY")}
            </Box>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Show Details
          </Button>
        </CardActions>
      </Card>
    );
  }

  renderValues = (value, valueType) => {
    if (value === undefined || value === null) {
      return "-";
    }

    switch (valueType) {
      case "percentage":
        return `${value / 10}%`;
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

MetricTile.propTypes = {
  name: PropTypes.string.isRequired,
  current: PropTypes.number,
  limit: PropTypes.number.isRequired,
  goal: PropTypes.number,
  wish: PropTypes.number,
  lastUpdated: PropTypes.string,
  type: PropTypes.string
};

export default MetricTile;
