import { connect } from "react-redux";
import { getAllTiles } from "../actions";
import Dashboard from "../components/dashboard";

const mapStateToProps = state => {
  return {
    tiles: state.tiles.items,
    isLoadingMetrics: state.tiles.isLoadingMetrics,
    error: state.tiles.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllTiles: () => dispatch(getAllTiles())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
