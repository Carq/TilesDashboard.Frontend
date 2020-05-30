import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  CardHeader,
} from "@material-ui/core";
import classNames from "classnames";
import PropTypes from "prop-types";
import { tileTypes } from "tiles/constants";
import { tileBasicData } from "tiles/propTypes";
import WeatherTileContent from "../weatherTileContent";
import MetricTileContent from "../metricTileContent";
import { convertDateTime } from "tiles/utils";
import "./styles.scss";

class Tile extends React.Component {
  render() {
    const { basicData, data } = this.props;
    const lastUpdated = data[0].addedOn;

    return (
      <Card
        className={classNames("card", {
          metric: basicData.type === tileTypes.METRIC,
          weather: basicData.type === tileTypes.WEATHER,
        })}
      >
        <CardHeader className="card-header" title={basicData.name} />
        <CardContent>{this.renderTileContent(basicData.type)}</CardContent>
        <CardActions m={0} disableSpacing>
          <Box color="text.hint" fontSize={12} textAlign="left" top={100}>
            Last updated: {lastUpdated && convertDateTime(lastUpdated)}
          </Box>
        </CardActions>
      </Card>
    );
  }

  renderTileContent = (type) => {
    const { data, configuration } = this.props;

    switch (type) {
      case tileTypes.WEATHER:
        return this.renderWeatherTileContent(data[0], data.slice(1));
      case tileTypes.METRIC:
        return this.renderMetricTileContent(data[0], configuration);
      default:
        return this.renderUnsupportedTile();
    }
  };

  renderWeatherTileContent = (currentData, recentData) => (
    <WeatherTileContent
      temperature={currentData.temperature}
      humidity={currentData.humidity}
      data={recentData}
    />
  );

  renderMetricTileContent = (data, configuration) => (
    <MetricTileContent current={data.value} configuration={configuration} />
  );

  renderUnsupportedTile = () => (
    <Box textAlign="center">
      <Typography color="error">Unsupported Tile</Typography>
    </Box>
  );
}

Tile.propTypes = {
  basicData: tileBasicData.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  configuration: PropTypes.object,
  lastUpdated: PropTypes.string,
};

export default Tile;
