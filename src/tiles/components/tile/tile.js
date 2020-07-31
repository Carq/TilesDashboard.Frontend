import React from "react";
import {
  Box,
  Card,
  IconButton,
  CardActions,
  CardContent,
  Typography,
  Tooltip,
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
import MetricTileContentGraph from "../metricTileContentGraph";
import IntegerTileContent from "../integerTileContent";
import IntegerTileContentGraph from "../integerTileContentGraph";
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
          metric: basicData.type === tileTypes.METRIC && !isGraph,
          weather: basicData.type === tileTypes.WEATHER && !isGraph,
        })}
      >
        <CardHeader
          className="card-header"
          style={{ padding: "14px 8px 8px" }}
          title={basicData.name}
          action={
            <Tooltip title="History">
              <IconButton
                onClick={this.toggleView}
                color={isGraph ? "primary" : "inherit"}
              >
                <TimelineOutlinedIcon />
              </IconButton>
            </Tooltip>
          }
        />
        {isGraph && (
          <div className="card__tile-graph">
            {this.renderTileGraph(basicData.type, tileData, loadingData)}
          </div>
        )}
        {view === viewModes.CURRENT && (
          <React.Fragment>
            <CardContent style={{ padding: "4px" }}>
              {this.renderTileContent(basicData.type)}
            </CardContent>
            <CardActions m={0} disableSpacing>
              <Box color="text.hint" fontSize={12} textAlign="left" top={100}>
                Last update: {lastUpdated && convertDateTime(lastUpdated)}
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
        return this.renderMetricTileContent(
          data[0],
          data.slice(1),
          configuration
        );
      case tileTypes.INTEGER:
        return this.renderIntegerTileContent(
          data[0],
          data.slice(1),
          configuration
        );
      default:
        return this.renderUnsupportedTile();
    }
  };

  renderTileGraph = (type, tileData, loadingData) => {
    const { configuration } = this.props;

    switch (type) {
      case tileTypes.WEATHER:
        return this.renderWeatherTileGraph(tileData, loadingData);
      case tileTypes.METRIC:
        return this.renderMetricTileGraph(tileData, configuration, loadingData);
      case tileTypes.INTEGER:
        return this.renderIntegerTileGraph(
          tileData,
          configuration,
          loadingData
        );
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

  renderWeatherTileGraph = (tileData, loadingData) => (
    <WeatherTileContentGraph data={tileData} loadingData={loadingData} />
  );

  renderMetricTileContent = (data, recentData, configuration) => (
    <MetricTileContent
      current={data.value}
      data={recentData}
      configuration={configuration}
    />
  );

  renderMetricTileGraph = (tileData, configuration, loadingData) => (
    <MetricTileContentGraph
      data={tileData}
      configuration={configuration}
      loadingData={loadingData}
    />
  );

  renderIntegerTileContent = (data, recentData, configuration) => (
    <IntegerTileContent
      current={data.value}
      data={recentData}
      configuration={configuration}
    />
  );

  renderIntegerTileGraph = (tileData, configuration, loadingData) => (
    <IntegerTileContentGraph
      data={tileData}
      configuration={configuration}
      loadingData={loadingData}
    />
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
    var parameters =
      basicData.type === tileTypes.WEATHER ? "hours=16" : "days=30";

    fetch(
      `${config.api.URL}/tiles/${basicData.type}/${basicData.name}/since?${parameters}`
    )
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
