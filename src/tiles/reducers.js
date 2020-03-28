import {
  GET_ALL_TILES_REQUEST,
  GET_ALL_TILES_COMPLETED,
  GET_ALL_TILES_FAILED
} from "./actionTypes";

const initialState = {
  items: [],
  isLoadingMetrics: false,
  error: ""
};

export function tilesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TILES_REQUEST:
      return {
        ...state,
        isLoadingMetrics: true
      };
    case GET_ALL_TILES_COMPLETED:
      return {
        ...state,
        items: action.tiles,
        isLoadingMetrics: false
      };
    case GET_ALL_TILES_FAILED:
      return {
        ...state,
        error: action.error,
        isLoadingMetrics: false
      };
    default:
      return state;
  }
}
