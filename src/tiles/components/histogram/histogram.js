import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Tooltip, Zoom } from "@material-ui/core";
import _ from "lodash";
import {
  colorStatusToBackgroundClassNames,
  convertToTimeOnly,
} from "../../utils";
import { histogramData } from "../../propTypes";

import "./styles.scss";

class Histogram extends React.Component {
  render() {
    const { data, colorData, valueSuffix } = this.props;

    const sortedData = _.sortBy(data, "date");
    const max = Math.max(_.maxBy(data, "value")["value"]);
    const min = Math.min(_.minBy(data, "value")["value"]);

    return (
      <div className="histogram">
        <div className="histogram__bars">
          {sortedData.map((x) => {
            const tooltipText = `${x.value}${
              valueSuffix || ""
            } ${convertToTimeOnly(x.date)}`;

            return (
              <Tooltip
                key={_.uniqueId()}
                TransitionComponent={Zoom}
                title={tooltipText}
                arrow
              >
                <div
                  className={classNames(
                    `histogram__bar-${this.calculateRank(x.value, min, max)}`,
                    colorData &&
                      colorStatusToBackgroundClassNames(colorData(x.value))
                  )}
                />
              </Tooltip>
            );
          })}
        </div>
      </div>
    );
  }

  calculateRank = (value, min, max) => {
    if (min === max) return 3;

    const step = Math.max(((max - min) / 4).toFixed(1), 0.1);
    if (value >= max) return 5;
    if (value >= max - step) return 4;
    if (value >= max - step * 2) return 3;
    if (value >= max - step * 3) return 2;
    return 1;
  };
}

Histogram.propTypes = {
  data: PropTypes.arrayOf(histogramData),
  colorData: PropTypes.func,
  valueSuffix: PropTypes.string,
};

export default Histogram;
