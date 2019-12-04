import React from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import "./styles.css";

class MetricTile extends React.Component {
  render() {
    const { name, current, limit, goal, wish, type } = this.props;

    return (
      <Card className="card">
        <CardHeader title={name} />
        <CardContent>
          <Typography color="textSecondary" component="span">
            <Box>Current: {this.renderValues(current, type)}</Box>
            <Box>Limit: {this.renderValues(limit, type)}</Box>
            <Box>Goal: {this.renderValues(goal, type)}</Box>
            <Box>Wish: {this.renderValues(wish, type)}</Box>
            <Box mt={1} color="text.hint" fontSize={12} textAlign="left">
              Last updated:
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
    switch (valueType) {
      case "percentage":
        return `${value}%`;
      case "time":
        return this.getFormatedTime(value);
      default:
        return value;
    }
  };

  getFormatedTime = seconds => {
    const format = val => `${Math.floor(val)}`.slice(-2);
    const hours = seconds / 3600;
    const minutes = (seconds % 3600) / 60;

    return `${format(hours)}h ${format(minutes)}m ${format(seconds % 60)}s`;
  };
}

MetricTile.propTypes = {
  name: PropTypes.string.isRequired,
  current: PropTypes.number.isRequired,
  limit: PropTypes.number,
  goal: PropTypes.number,
  wish: PropTypes.number,
  date: PropTypes.string,
  type: PropTypes.string
};

export default MetricTile;
