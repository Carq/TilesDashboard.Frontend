import { GET_TILES } from "./actionTypes";

const initialState = {
  items: [{ name: "oldTile" }],
  isLoadingMetrics: true
};

export function tilesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TILES:
      return {
        ...state,
        items: [...state.items, { name: "newTile" }],
        isLoadingMetrics: false
      };
    default:
      return state;
  }
}
