import React from "react";
import { Box, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { colorStatuses } from "../../constants";
import { colorStatusToClassNames } from "../../utils";
import { weatherData } from "../../propTypes";
import Histogram from "../histogram";
import classNames from "classnames";
import "./styles.css";

class WeatherTileContent extends React.Component {
  render() {
    const { temperature, humidity, recentData } = this.props;

    var colorStatus = this.calculateTemperatureColor(temperature);

    return (
      <div className="weather-tile__content">
        <Box justifyContent="center">
          <div className="weather-tile__temperature">
            <Typography
              className={classNames(colorStatusToClassNames(colorStatus))}
              variant="h3"
              align="center"
            >{`${temperature.toFixed(1)}°C`}</Typography>
            <Histogram
              currentValue={temperature}
              data={recentData.map((item) => ({
                value: item.temperature,
                date: item.addedOn,
              }))}
              valueSuffix={"°C"}
              colorData={this.calculateTemperatureColor}
            />
          </div>

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

  calculateTemperatureColor = (temperature) => {
    if (temperature > 25) return colorStatuses.RED;
    if (temperature > 23) return colorStatuses.AMBER;
    if (temperature > 19) return colorStatuses.LIGHTGREEN;
    if (temperature > 4) return colorStatuses.LIGHTBLUE;
    return colorStatuses.BLUE;
  };
}

WeatherTileContent.propTypes = {
  temperature: PropTypes.number.isRequired,
  humidity: PropTypes.number,
  recentData: PropTypes.arrayOf(weatherData),
};

export default WeatherTileContent;
