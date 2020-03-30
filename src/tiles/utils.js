import classNames from "classnames";
import { colorStatuses } from "./constants";

export function colorStatusToClassNames(colorStatus, prefix) {
  return classNames({
    green: colorStatus && colorStatus === colorStatuses.GREEN,
    "light-green": colorStatus && colorStatus === colorStatuses.LIGHTGREEN,
    amber: colorStatus && colorStatus === colorStatuses.AMBER,
    red: colorStatus && colorStatus === colorStatuses.RED,
    blue: colorStatus && colorStatus === colorStatuses.BLUE,
    "light-blue": colorStatus && colorStatus === colorStatuses.LIGHTBLUE
  });
}
