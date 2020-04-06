import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Box, Grid, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import Tile from "../tile";
import { tileTypes } from "../../constants";
import config from "../../../config";
import "./styles.css";

class Dashboard extends React.Component {
  state = { lastTilesAmount: 4, lastUpdatedTile: null };

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

    this.refreshTileInterval = setInterval(
      () => this.refreshTile(),
      (config.dashboard.refreshInterval || 60) * 1000
    );

    getAllTiles();
  };

  componentWillUnmount() {
    clearInterval(this.refreshTileInterval);
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
            tiles.map((tile) => {
              const basicData = { name: tile.name, type: tile.type };
              return (
                <Grid item key={basicData.name}>
                  <Tile
                    basicData={basicData}
                    data={tile.data}
                    configuration={tile.configuration}
                    lastUpdated={tile.data[0].addedOn}
                  />
                </Grid>
              );
            })}
        </Grid>
      </div>
    );
  }

  refreshTile = () => {
    const { getTile, tiles } = this.props;
    const { lastUpdatedTile } = this.state;
    let tileToRefresh;

    if (lastUpdatedTile) {
      let tileIndex = _.findIndex(tiles, {
        name: lastUpdatedTile.name,
        type: lastUpdatedTile.type,
      });

      if (++tileIndex > tiles.length) {
        tileIndex = 0;
      }

      tileToRefresh = tiles[tileIndex];
    }

    tileToRefresh = tileToRefresh || tiles[0];

    getTile(tileToRefresh.name, tileToRefresh.type);
    this.setState({
      lastUpdatedTile: {
        name: tileToRefresh.name,
        type: tileToRefresh.type,
      },
    });
  };
}

Dashboard.propTypes = {
  tiles: PropTypes.array,
  isLoadingMetrics: PropTypes.bool.isRequired,
  getAllTiles: PropTypes.func.isRequired,
  getTile: PropTypes.func.isRequired,
};

export default Dashboard;
