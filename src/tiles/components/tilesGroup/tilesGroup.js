import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import Tile from "../tile";

class TilesGroup extends React.Component {
  displaySkeletons = () => {
    const { lastTilesAmount } = this.props;
    return [...Array(parseInt(lastTilesAmount || 1)).keys()].map((x) => (
      <Grid item key={x}>
        <Skeleton variant="rect" height={300} width={305} />
      </Grid>
    ));
  };

  render() {
    const { tiles, isLoadingMetrics } = this.props;

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
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
    );
  }
}

TilesGroup.propTypes = {
  tiles: PropTypes.array,
  isLoadingMetrics: PropTypes.bool.isRequired,
  lastTilesAmount: PropTypes.number,
};

export default TilesGroup;
