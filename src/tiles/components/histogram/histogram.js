import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Tooltip, Zoom } from "@material-ui/core";
import maxBy from "lodash/maxBy";
import minBy from "lodash/minBy";
import sortBy from "lodash/sortBy";
import uniqueId from "lodash/uniqueId";
import {
  colorStatusToBackgroundClassNames,
  convertToTimeOnly,
} from "../../utils";
import { histogramData } from "../../propTypes";

import "./styles.scss";

class Histogram extends React.Component {
  render() {
    const { data, colorData, valueSuffix, minimalStep } = this.props;

    const sortedData = sortBy(data, "date");
    const max = Math.max(maxBy(data, "value")["value"]);
    const min = Math.min(minBy(data, "value")["value"]);

    return (
      <div className="histogram">
        <div className="histogram__bars">
          {sortedData.map((x) => {
            const tooltipText = `${x.value}${
              valueSuffix || ""
            } ${convertToTimeOnly(x.date)}`;

            return (
              <Tooltip
                key={uniqueId()}
                TransitionComponent={Zoom}
                title={tooltipText}
                arrow
              >
                <div
                  className={classNames(
                    `histogram__bar-${this.calculateRank(
                      x.value,
                      min,
                      max,
                      minimalStep
                    )}`,
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

  calculateRank = (value, min, max, minimalStep) => {
    if (min === max) return 3;

    const step = Math.max(((max - min) / 4).toFixed(1), minimalStep);
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
  minimalStep: PropTypes.number,
};

Histogram.defaultProps = {
  minimalStep: 0.1,
};

export default Histogram;
