import React, {Component, PropTypes} from 'react';
import ItemsList from './List';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/actions';

export default class ListPage extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      loadItems: PropTypes.func.isRequired
    }),
    items: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.actions.loadItems();
  }

  render() {
    return (
      <div>
        <h2>Items</h2>
        <ItemsList items={this.props.items}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.items
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPage);
