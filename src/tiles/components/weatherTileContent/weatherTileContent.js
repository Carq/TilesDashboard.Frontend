import React from "react";
import { Box, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { colorStatuses } from "../../constants";
import { colorStatusToClassNames } from "../../utils";
import "./styles.css";

class WeatherTileContent extends React.Component {
  render() {
    const { temperature, humidity } = this.props;

    var colorStatus = this.calculateTemperatureColor(temperature);

    return (
      <div className="weather-tile-content">
        <Box justifyContent="center">
          <Typography
            className={colorStatusToClassNames(colorStatus)}
            variant="h3"
            align="center"
          >{`${temperature.toFixed(1)}°C`}</Typography>
          <Typography align="center" color="textSecondary">
            Temperature
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="h5" align="center">{`${humidity.toFixed(
            0
          )}%`}</Typography>
          <Typography align="center" color="textSecondary">
            Humidity
          </Typography>
        </Box>
      </div>
    );
  }

  calculateTemperatureColor = temperature => {
    if (temperature > 25) return colorStatuses.RED;
    if (temperature > 23) return colorStatuses.AMBER;
    if (temperature > 19) return colorStatuses.LIGHTGREEN;
    if (temperature > 4) return colorStatuses.LIGHTBLUE;
    return colorStatuses.BLUE;
  };
}

WeatherTileContent.propTypes = {
  temperature: PropTypes.number.isRequired,
  humidity: PropTypes.number
};

export default WeatherTileContent;
