import React from "react";
import {
  Box,
  Card,
  IconButton,
  CardActions,
  CardContent,
  Typography,
  CardHeader,
} from "@material-ui/core";
import TimelineOutlinedIcon from "@material-ui/icons/TimelineOutlined";
import classNames from "classnames";
import PropTypes from "prop-types";
import { tileTypes, viewModes } from "tiles/constants";
import { tileBasicData } from "tiles/propTypes";
import WeatherTileContent from "../weatherTileContent";
import WeatherTileContentGraph from "../weatherTileContentGraph";
import MetricTileContent from "../metricTileContent";
import { convertDateTime, addHours } from "tiles/utils";
import "./styles.scss";
import config from "config";

class Tile extends React.Component {
  state = {
    tileData: [],
    loadingData: false,
    view: viewModes.CURRENT,
  };

  render() {
    const { basicData, data } = this.props;
    const { tileData, view, loadingData } = this.state;
    const lastUpdated = data[0].addedOn;
    const isGraph = view === viewModes.GRAPH;

    return (
      <Card
        className={classNames("card", {
          metric: basicData.type === tileTypes.METRIC,
          weather: basicData.type === tileTypes.WEATHER,
        })}
      >
        <CardHeader
          className="card-header"
          title={basicData.name}
          action={
            basicData.type === tileTypes.WEATHER && (
              <IconButton
                onClick={this.toggleView}
                color={isGraph ? "primary" : "inherit"}
              >
                <TimelineOutlinedIcon />
              </IconButton>
            )
          }
        />
        {isGraph && (
          <div className="card__tile-graph">
            <WeatherTileContentGraph
              data={tileData}
              loadingData={loadingData}
            />
          </div>
        )}
        {view === viewModes.CURRENT && (
          <React.Fragment>
            <CardContent>{this.renderTileContent(basicData.type)}</CardContent>
            <CardActions m={0} disableSpacing>
              <Box color="text.hint" fontSize={12} textAlign="left" top={100}>
                Last updated: {lastUpdated && convertDateTime(lastUpdated)}
              </Box>
            </CardActions>
          </React.Fragment>
        )}
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

  toggleView = () => {
    const { view } = this.state;

    this.setState(
      {
        view: view === viewModes.CURRENT ? viewModes.GRAPH : viewModes.CURRENT,
      },
      this.loadDataForGraphs
    );
  };

  loadDataForGraphs = () => {
    const { basicData } = this.props;
    const { loadingData, loadedDate, view } = this.state;

    if (view !== viewModes.GRAPH) {
      return;
    }

    if (loadingData || (loadedDate && addHours(loadedDate, 1) > Date.now())) {
      return;
    }

    this.setState(
      {
        loadingData: true,
      },
      this.makeRequestForTileData(basicData)
    );
  };

  makeRequestForTileData(basicData) {
    fetch(`${config.api.URL}/tiles/weather/${basicData.name}/since?hours=16`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            tileData: result,
            loadingData: false,
            loadedDate: Date.now(),
          });
        },
        (error) => {
          this.setState({
            loadingData: false,
          });
          console.error(error);
        }
      );
  }
}

Tile.propTypes = {
  basicData: tileBasicData.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  configuration: PropTypes.object,
  lastUpdated: PropTypes.string,
};

export default Tile;
