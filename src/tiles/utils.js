import { colorStatuses } from "./constants";

export function colorStatusToClassNames(colorStatus) {
  if (!colorStatus) return;

  return {
    green: colorStatus === colorStatuses.GREEN,
    "light-green": colorStatus === colorStatuses.LIGHTGREEN,
    amber: colorStatus === colorStatuses.AMBER,
    red: colorStatus === colorStatuses.RED,
    blue: colorStatus === colorStatuses.BLUE,
    "light-blue": colorStatus === colorStatuses.LIGHTBLUE,
    aqua: colorStatus === colorStatuses.AQUA,
  };
}

export function colorStatusToBackgroundClassNames(colorStatus) {
  if (!colorStatus) return;

  return {
    "background-green": colorStatus === colorStatuses.GREEN,
    "background-light-green": colorStatus === colorStatuses.LIGHTGREEN,
    "background-amber": colorStatus === colorStatuses.AMBER,
    "background-red": colorStatus === colorStatuses.RED,
    "background-blue": colorStatus === colorStatuses.BLUE,
    "background-light-blue": colorStatus === colorStatuses.LIGHTBLUE,
    "background-aqua": colorStatus === colorStatuses.AQUA,
  };
}

export function convertToTimeOnly(date) {
  var localTime = new Date(date);
  var minutes = `${localTime.getMinutes()}`.padStart(2, "0");
  return `${localTime.getHours()}:${minutes}`;
}
