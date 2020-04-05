import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import Tile from "../tile";
import "./styles.css";

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

    getAllTiles();
  };

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
            Tiles
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
                    currentData={tile.currentData}
                    recentData={tile.recentData}
                    configuration={tile.configuration}
                    lastUpdated={tile.currentData.addedOn}
                  />
                </Grid>
              );
            })}
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  tiles: PropTypes.array,
  isLoadingMetrics: PropTypes.bool.isRequired,
  getAllTiles: PropTypes.func.isRequired,
};

export default Dashboard;
