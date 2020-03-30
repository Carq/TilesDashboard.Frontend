import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import Tile from "../tile";
import "./styles.css";

class Dashboard extends React.Component {
  displaySkeletons = () =>
    [...Array(4).keys()].map(x => (
      <Grid item key={x}>
        <Skeleton variant="rect" height={270} width={275} />
      </Grid>
    ));

  componentDidMount = () => {
    const { getAllTiles } = this.props;
    getAllTiles();
  };

  componentDidUpdate(prevProps) {
    const { error, enqueueSnackbar } = this.props;
    if (prevProps.error !== error && error) {
      enqueueSnackbar(error, {
        variant: "error"
      });
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
            tiles.map(tile => {
              const basicData = { name: tile.name, type: tile.type };
              return (
                <Grid item key={basicData.name}>
                  <Tile
                    basicData={basicData}
                    data={tile.currentData}
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
  getAllTiles: PropTypes.func.isRequired
};

export default Dashboard;
