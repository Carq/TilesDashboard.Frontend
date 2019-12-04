import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import MetricTile from "./MetricTile";
import "./styles.css";
import config from "../config";

class Dashboard extends React.Component {
  state = {
    isLoadingMetrics: true,
    metrics: null
  };

  componentDidMount() {
    this.fetchMetrics();
  }

  fetchMetrics() {
    fetch(config.api.URL + `/metrics/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data =>
        this.setState({ metrics: [...data], isLoadingMetrics: false })
      )
      .catch(error => {
        this.setState({ isLoadingMetrics: false });
        console.log(error);
      });
  }

  render() {
    const { metrics, isLoadingMetrics } = this.state;

    return (
      <div className="main">
        <Typography variant="h2" color="primary">
          <Box lineHeight={2} textAlign="center">
            Metrics
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
            metrics.map(metric => (
              <Grid item>
                <MetricTile
                  name={metric.name}
                  limit={metric.limit}
                  goal={metric.goal}
                  wish={metric.wish}
                  type={metric.type}
                  current={42}
                />
              </Grid>
            ))}
        </Grid>
      </div>
    );
  }

  displaySkeletons = () =>
    Array(4)
      .fill()
      .map(x => (
        <Grid item>
          <Skeleton variant="rect" height={263} width={275} />
        </Grid>
      ));
}

export default Dashboard;
