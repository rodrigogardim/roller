import { connect } from 'react-redux';
import LayerCollection from '../components/LayerCollection';
import * as actions from '../actions/LayerActions';

const mapStateToProps = (state, ownProps) => {
  return {...state.router, ...state.layers}
}

export default connect(mapStateToProps, actions)(LayerCollection);
