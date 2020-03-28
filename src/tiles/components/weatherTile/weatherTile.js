import React from "react";
import moment from "moment";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography
} from "@material-ui/core";
import PropTypes from "prop-types";
import "./styles.css";

class WeatherTile extends React.Component {
  render() {
    const { name, temperature, humidity, lastUpdated } = this.props;

    return (
      <Card className="card">
        <CardHeader title={`Weather ${name}`} />
        <CardContent>
          <Typography color="textSecondary" component="span">
            <Box>Temperature: {`${temperature}°C`}</Box>
            <Box>Humidity: {`${humidity}%`}</Box>
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
      </Card>
    );
  }
}

WeatherTile.propTypes = {
  name: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired,
  humidity: PropTypes.number,
  lastUpdated: PropTypes.string
};

export default WeatherTile;
