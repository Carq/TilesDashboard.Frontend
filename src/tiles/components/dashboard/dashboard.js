import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import MetricTile from "../metricTile";
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
            tiles.map(tile => (
              <Grid item key={tile.name}>
                <MetricTile
                  name={tile.name}
                  current={tile.currentData?.value}
                  limit={tile.configuration?.limit}
                  goal={tile.configuration?.goal}
                  wish={tile.configuration?.wish}
                  lastUpdated={tile.currentData?.addedOn}
                  type={tile.configuration?.metricType}
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
  getAllTiles: PropTypes.func.isRequired
};

export default Dashboard;
