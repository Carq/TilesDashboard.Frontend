import React from "react";
import PropTypes from "prop-types";
import { HubConnectionBuilder } from "@aspnet/signalr";
import { Box, Grid, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import Tile from "../tile";
import config from "config";
import "./styles.scss";

class Dashboard extends React.Component {
  state = { lastTilesAmount: 4 };

  displaySkeletons = () => {
    const { lastTilesAmount } = this.state;
    return [...Array(parseInt(lastTilesAmount)).keys()].map((x) => (
      <Grid item key={x}>
        <Skeleton variant="rect" height={300} width={305} />
      </Grid>
    ));
  };

  componentDidMount = () => {
    const { getAllTiles } = this.props;
    var lastTilesAmount = localStorage.getItem("lastTilesAmount");
    if (lastTilesAmount) {
      this.setState({
        lastTilesAmount,
      });
    }

    this.setupNotifications();

    getAllTiles();
  };

  setupNotifications() {
    const signalRConnection = new HubConnectionBuilder()
      .withUrl(`${config.api.URL}/notifications`)
      .build();
    signalRConnection.start().catch((err) => {
      console.log("Connection error" + err);
    });
    signalRConnection.on("NewData", (tileName, tileType, newValue) => {
      const { getTile } = this.props;
      getTile(tileName, tileType.toLowerCase(), newValue);
    });
  }

  componentDidUpdate(prevProps) {
    const { error, enqueueSnackbar, tiles, isLoadingMetrics } = this.props;
    if (prevProps.error !== error && error) {
      enqueueSnackbar(error, {
        variant: "error",
      });
    }

    if (prevProps.tiles.length !== tiles.length && !isLoadingMetrics) {
      localStorage.setItem("lastTilesAmount", tiles.length);
    }
  }

  render() {
    const { tiles, isLoadingMetrics } = this.props;

    return (
      <div className="main">
        <Typography variant="h2" color="primary">
          <Box lineHeight={2} textAlign="center">
            {config.dashboard.name || "Tiles"}
          </Box>
        </Typography>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          className="dashboard-grid"
          spacing={4}
        >
          {isLoadingMetrics && this.displaySkeletons()}
          {!isLoadingMetrics &&
            tiles &&
            tiles.map((tile) => (
              <Grid item key={tile.name}>
                <Tile
                  basicData={{ name: tile.name, type: tile.type }}
                  data={tile.data}
                  configuration={tile.configuration}
                  lastUpdated={tile.data[0].addedOn}
                />
              </Grid>
            ))}
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  tiles: PropTypes.array,
  isLoadingMetrics: PropTypes.bool.isRequired,
  getAllTiles: PropTypes.func.isRequired,
  getTile: PropTypes.func.isRequired,
};

export default Dashboard;
