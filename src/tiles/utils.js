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

export function convertDateTime(date) {
  var localTime = new Date(date);
  var day = `${localTime.getDay()}`.padStart(2, "0");
  var month = `${localTime.getMonth()}`.padStart(2, "0");
  var minutes = `${localTime.getMinutes()}`.padStart(2, "0");
  return `${day}.${month}.${localTime.getFullYear()} ${localTime.getHours()}:${minutes}`;
}
