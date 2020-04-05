import { colorStatuses } from "./constants";

export function colorStatusToClassNames(colorStatus) {
  return {
    green: colorStatus && colorStatus === colorStatuses.GREEN,
    "light-green": colorStatus && colorStatus === colorStatuses.LIGHTGREEN,
    amber: colorStatus && colorStatus === colorStatuses.AMBER,
    red: colorStatus && colorStatus === colorStatuses.RED,
    blue: colorStatus && colorStatus === colorStatuses.BLUE,
    "light-blue": colorStatus && colorStatus === colorStatuses.LIGHTBLUE,
  };
}

export function colorStatusToBackgroundClassNames(colorStatus) {
  return {
    "background-green": colorStatus && colorStatus === colorStatuses.GREEN,
    "background-light-green":
      colorStatus && colorStatus === colorStatuses.LIGHTGREEN,
    "background-amber": colorStatus && colorStatus === colorStatuses.AMBER,
    "background-red": colorStatus && colorStatus === colorStatuses.RED,
    "background-blue": colorStatus && colorStatus === colorStatuses.BLUE,
    "background-light-blue":
      colorStatus && colorStatus === colorStatuses.LIGHTBLUE,
  };
}

export function convertToTimeOnly(date) {
  var localTime = new Date(date);
  var minutes = `${localTime.getMinutes()}`.padStart(2, "0");
  return `${localTime.getHours()}:${minutes}`;
}
