import _ from "lodash";

import {
  GET_ALL_TILES_REQUEST,
  GET_ALL_TILES_COMPLETED,
  GET_ALL_TILES_FAILED,
  GET_TILE_REQUEST,
  GET_TILE_COMPLETED,
  GET_TILE_FAILED,
} from "./actionTypes";

const initialState = {
  items: [],
  isLoadingMetrics: false,
  error: "",
};

export function tilesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TILES_REQUEST:
      return {
        ...state,
        isLoadingMetrics: true,
      };
    case GET_ALL_TILES_COMPLETED:
      return {
        ...state,
        items: action.tiles,
        isLoadingMetrics: false,
      };
    case GET_ALL_TILES_FAILED:
      return {
        ...state,
        error: action.error,
        isLoadingMetrics: false,
      };
    case GET_TILE_REQUEST:
      return {
        ...state,
      };
    case GET_TILE_COMPLETED:
      const { items } = state;

      const itemIndex = _.findIndex(items, {
        name: action.tileName,
        type: action.tileType,
      });

      if (itemIndex < 0) {
        return { ...state };
      }

      const updatedItem = {
        ...state.items[itemIndex],
        data: action.data,
      };

      return {
        ...state,
        items: updateObjectInArray(state.items, itemIndex, updatedItem),
      };
    case GET_TILE_FAILED:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}

function updateObjectInArray(array, itemIndex, updatedItem) {
  return array.map((item, index) => {
    if (index !== itemIndex) {
      // This isn't the item we care about - keep it as-is
      return item;
    }

    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      ...updatedItem,
    };
  });
}
