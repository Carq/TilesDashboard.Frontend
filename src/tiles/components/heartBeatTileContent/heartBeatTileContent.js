import React from "react";
import { Typography } from "@material-ui/core";
import "./styles.scss";
import classNames from "classnames";
import Link from "@material-ui/core/Link";
import { colorStatuses } from "../../constants";
import { colorStatusToClassNames, convertToSeconds } from "../../utils";
import Histogram from "../histogram";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PropTypes, { object } from "prop-types";
import { heartBeatData, heartBeatConfiguration } from "../../propTypes";

class HeartBeatTileContent extends React.Component {
  render() {
    const { current, data, configuration } = this.props;
    const { applicationUrl, description } = configuration;
    const { responseTimeInMs } = current;

    const color = this.calculateColor(responseTimeInMs);
    const appIsRun = responseTimeInMs > 0;

    return (
      <div className="heartBeat-content">
        <div
          className={classNames(
            "heartBeat__icon-section",
            colorStatusToClassNames(color)
          )}
        >
          <FavoriteIcon
            fontSize="large"
            style={{
              color: colorStatusToClassNames(color),
              fontSize: 160,
            }}
          />
        </div>

        <div className="heartBeat__current-section ">
          <div className="heartBeat__histogram">
            <Histogram
              data={data.map((item) => ({
                value: convertToSeconds(item.responseTimeInMs),
                date: item.addedOn,
              }))}
              valueSuffix={"s"}
              colorData={this.calculateColor}
            />
          </div>
          <Typography
            className={classNames(colorStatusToClassNames(color))}
            align="center"
          >
            {(appIsRun && `${convertToSeconds(responseTimeInMs)}s`) ||
              `No Response`}
          </Typography>
        </div>

        <div className="heartBeat__description-section ">
          <Link href={applicationUrl} color="inherit">
            <Typography>{description || "Link"}</Typography>
          </Link>
        </div>
      </div>
    );
  }

  calculateColor = (responseInMs) => {
    if (responseInMs > 0) return colorStatuses.LIGHTGREEN;
    return colorStatuses.RED;
  };
}

HeartBeatTileContent.propTypes = {
  current: heartBeatData.isRequired,
  configuration: heartBeatConfiguration.isRequired,
  data: PropTypes.arrayOf(object),
};

export default HeartBeatTileContent;
