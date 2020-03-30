import React from "react";
import { Box, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import "./styles.css";

class WeatherTileContent extends React.Component {
  render() {
    const { temperature, humidity } = this.props;

    return (
      <React.Fragment>
        <Typography color="textSecondary" component="span">
          <Box>Temperature: {`${temperature}°C`}</Box>
          <Box>Humidity: {`${humidity}%`}</Box>
        </Typography>
      </React.Fragment>
    );
  }
}

WeatherTileContent.propTypes = {
  temperature: PropTypes.number.isRequired,
  humidity: PropTypes.number
};

export default WeatherTileContent;
