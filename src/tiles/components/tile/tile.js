import React from "react";
import moment from "moment";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  CardHeader
} from "@material-ui/core";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import classNames from "classnames";
import PropTypes from "prop-types";
import { tileTypes } from "../../constants";
import { tileBasicData } from "../../propTypes";
import WeatherTileContent from "../weatherTileContent";
import MetricTileContent from "../metricTileContent";
import "./styles.scss";

class Tile extends React.Component {
  render() {
    const { basicData, lastUpdated } = this.props;

    return (
      <Card
        className={classNames("card", {
          metric: basicData.type === tileTypes.METRIC,
          weather: basicData.type === tileTypes.WEATHER
        })}
      >
        <CardHeader className="card-header" title={basicData.name} />
        <CardContent>{this.renderTileContent(basicData.type)}</CardContent>
        <CardActions m={0} disableSpacing>
          <Box color="text.hint" fontSize={12} textAlign="left" top={100}>
            Last updated:{" "}
            {lastUpdated && moment(lastUpdated).format("DD.MM.YYYY HH:mm")}
          </Box>
        </CardActions>
      </Card>
    );
  }

  renderTileContent = type => {
    const { data, configuration } = this.props;

    switch (type) {
      case tileTypes.WEATHER:
        return this.renderWeatherTileContent(data);
      case tileTypes.METRIC:
        return this.renderMetricTileContent(data, configuration);
      default:
        return this.renderUnsupportedTile();
    }
  };

  renderWeatherTileContent = data => (
    <WeatherTileContent
      temperature={data.temperature}
      humidity={data.humidity}
    />
  );

  renderMetricTileContent = (data, configuration) => (
    <MetricTileContent current={data.value} configuration={configuration} />
  );

  renderUnsupportedTile = () => (
    <Box textAlign="center">
      <SentimentDissatisfiedIcon fontSize="large" color="error" />
      <Typography color="error">Unsupported Tile</Typography>
    </Box>
  );
}

Tile.propTypes = {
  basicData: tileBasicData.isRequired,
  data: PropTypes.object,
  configuration: PropTypes.object,
  lastUpdated: PropTypes.string
};

export default Tile;
