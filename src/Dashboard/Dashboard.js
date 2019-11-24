import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import MetricTile from "./MetricTile";
import Typography from "@material-ui/core/Typography";
import "./styles.css";
import config from "../config";

class Dashboard extends React.Component {
  componentDidMount() {
    console.log("start");
    this.fetchMetrics();
  }

  fetchMetrics() {
    console.log("test");
    fetch(config.api.URL + `/metrics/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ metrics: [...data] });
        console.log(data);
      });
  }

  render() {
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
          <Grid item>
            <MetricTile name={"BE Unit Test Coverate"} current={42} />
          </Grid>
          <Grid item>
            <MetricTile name={"BE Build Time"} current={42} />
          </Grid>
          <Grid item>
            <MetricTile name={"FE Build Time"} current={42} />
          </Grid>
          <Grid item>
            <MetricTile name={"Monthly Azure Cost"} current={42} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
