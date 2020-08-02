import React from "react";
import { Typography } from "@material-ui/core";
import "./styles.scss";
import Histogram from "../histogram";
import PropTypes, { object } from "prop-types";
import { integerConfiguration } from "../../propTypes";

class IntegerTileContent extends React.Component {
  render() {
    const { current, data, configuration } = this.props;
    const { unit, description } = configuration;

    return (
      <div className="integer-tile-content">
        <div className="integer-tile__current-section ">
          <Typography variant="h1" align="center">
            {current}
          </Typography>
          <Typography align="center">{unit}</Typography>
          <Typography color="textSecondary" align="center">
            {description}
          </Typography>
          <div className="integer-tile__histogram">
            <Histogram
              data={data.map((item) => ({
                value: item.value,
                date: item.addedOn,
              }))}
              displayOnlyTime={false}
            />
          </div>
        </div>
      </div>
    );
  }

  renderValues = (value, unit) => {
    if (value === undefined || value === null) {
      return "-";
    }

    if (unit) {
      return `${value} ${unit}`;
    }

    return value;
  };
}

IntegerTileContent.propTypes = {
  current: PropTypes.number.isRequired,
  configuration: integerConfiguration,
  data: PropTypes.arrayOf(object),
};

export default IntegerTileContent;
