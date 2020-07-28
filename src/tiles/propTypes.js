import { PropTypes } from "prop-types";
import { tileTypes, metricTypes } from "./constants";

export const tileBasicData = PropTypes.shape({
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(tileTypes)),
});

export const metricConfiguration = PropTypes.shape({
  limit: PropTypes.number.isRequired,
  wish: PropTypes.number,
  goal: PropTypes.number,
  metricType: PropTypes.oneOf(Object.values(metricTypes)).isRequired,
});

export const integerConfiguration = PropTypes.shape({
  unit: PropTypes.string,
});

export const weatherData = PropTypes.shape({
  temperature: PropTypes.number.isRequired,
  humidity: PropTypes.number,
  addedOn: PropTypes.string.isRequired,
});

export const histogramData = PropTypes.shape({
  value: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
});
