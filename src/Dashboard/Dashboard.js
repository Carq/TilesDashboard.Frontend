import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import MetricTile from "./MetricTile";
import "./styles.css";
import config from "../config";

class Dashboard extends React.Component {
  state = {
    isLoadingMetrics: true,
    tiles: null
  };

  componentDidMount() {
    this.fetchMetrics();
  }

  fetchMetrics = () => {
    fetch(config.api.URL + `/tiles/all`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data =>
        this.setState({ tiles: [...data], isLoadingMetrics: false })
      )
      .catch(error => {
        this.setState({ isLoadingMetrics: false });
        console.log(error);
      });
  };

  render() {
    const { tiles, isLoadingMetrics } = this.state;

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
            tiles.map(tile => (
              <Grid item key={tile.name}>
                <MetricTile
                  name={tile.name}
                  current={tile.currentData.value}
                  limit={tile.configuration?.limit}
                  goal={tile.configuration?.goal}
                  wish={tile.configuration?.wish}
                  lastUpdated={tile.currentData.addedOn}
                  type={tile.configuration?.metricType}
                />
              </Grid>
            ))}
        </Grid>
      </div>
    );
  }

  displaySkeletons = () =>
    [...Array(4).keys()].map(x => (
      <Grid item key={x}>
        <Skeleton variant="rect" height={270} width={275} />
      </Grid>
    ));
}

export default Dashboard;
