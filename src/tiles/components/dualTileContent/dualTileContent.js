import React from "react";
import { Box, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { colorStatuses } from "../../constants";
import { colorStatusToClassNames } from "../../utils";
import { dualData } from "../../propTypes";
import Histogram from "../histogram";
import classNames from "classnames";
import "./styles.scss";

class DualTileContent extends React.Component {
  render() {
    const { primary, secondary, data } = this.props;

    var primaryColorStatus = this.calculateColor(primary);
    var secondaryColorStatus = this.calculateColor(secondary);

    return (
      <div className="weather-tile__content">
        <Box justifyContent="center">
          <div className="weather-tile__section">
            <div className="weather-tile__temperature-histogram">
              <Histogram
                data={data.map((item) => ({
                  value: item.primary,
                  date: item.addedOn,
                }))}
                valueSuffix={"PM2.5"}
                colorData={this.calculateColor}
              />
            </div>
            <Typography
              className={classNames(
                colorStatusToClassNames(primaryColorStatus)
              )}
              variant="h3"
              align="center"
            >{`${primary}`}</Typography>
          </div>

          <Typography align="center" color="textSecondary">
            PM2.5
          </Typography>
        </Box>
        <Box mt={2}>
          <div className="weather-tile__section">
            <div className="weather-tile__humidity-histogram">
              <Histogram
                data={data.map((item) => ({
                  value: item.secondary,
                  date: item.addedOn,
                }))}
                valueSuffix={"PM10"}
                minimalStep={1}
                colorData={this.calculateColor}
              />
            </div>
            <Typography
              variant="h5"
              align="center"
              className={classNames(
                colorStatusToClassNames(secondaryColorStatus)
              )}
            >{`${secondary}`}</Typography>
          </div>
          <Typography align="center" color="textSecondary">
            PM10
          </Typography>
        </Box>
      </div>
    );
  }

  calculateColor = (value) => {
    if (value > 55) return colorStatuses.RED;
    if (value > 35) return colorStatuses.AMBER;
    if (value > 13) return colorStatuses.LIGHTGREEN;
    return colorStatuses.GREEN;
  };
}

DualTileContent.propTypes = {
  primary: PropTypes.number.isRequired,
  secondary: PropTypes.number,
  data: PropTypes.arrayOf(dualData),
};

export default DualTileContent;
