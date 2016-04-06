import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import ItemsList from './List';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/actions';

class ListPage extends Component {
  componentDidMount() {
    this.props.actions.loadItems();
  }

  render() {
    return (
      <div>
        <Helmet title="Todo Items"/>
        <h2>Items</h2>
        <div className="btn-toolbar">
          <Link className="btn btn-primary" data-tooltip="Create new Item" to="/items/create">
            <span className="glyphicon glyphicon-plus"/> Create Item
          </Link>
        </div>
        <ItemsList items={this.props.items}/>
      </div>
    );
  }
}

ListPage.propTypes = {
  actions: PropTypes.shape({
    loadItems: PropTypes.func.isRequired
  }),
  items: PropTypes.array.isRequired
};

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
