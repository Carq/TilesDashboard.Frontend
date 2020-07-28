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
  convertToDateWithoutYearOnly,
} from "../../utils";
import { histogramData } from "../../propTypes";
import { colorStatuses } from "../../constants";
import "./styles.scss";

class Histogram extends React.Component {
  render() {
    const {
      data,
      colorData,
      valueSuffix,
      minimalStep,
      displayOnlyTime,
    } = this.props;

    if (data.length === 0) {
      return <div className="histogram"></div>;
    }

    const sortedData = sortBy(data, "date");
    const max = Math.max(maxBy(data, "value")["value"]);
    const min = Math.min(minBy(data, "value")["value"]);

    return (
      <div className="histogram">
        <div className="histogram__bars">
          {sortedData.map((x) => {
            const tooltipText = `${x.value}${valueSuffix || ""} ${
              displayOnlyTime
                ? convertToTimeOnly(x.date)
                : convertToDateWithoutYearOnly(x.date)
            }`;

            return (
              <Tooltip
                key={uniqueId()}
                TransitionComponent={Zoom}
                title={tooltipText}
                arrow
              >
                <div
                  className={classNames(
                    (colorData &&
                      colorStatusToBackgroundClassNames(colorData(x.value))) ||
                      colorStatusToBackgroundClassNames(colorStatuses.SILVER),
                    `histogram__bar-${this.calculateRank(
                      x.value,
                      min,
                      max,
                      minimalStep
                    )}`
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
  displayOnlyTime: PropTypes.bool,
};

Histogram.defaultProps = {
  minimalStep: 0.1,
  displayOnlyTime: true,
};

export default Histogram;
