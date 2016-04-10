import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import ItemsList from './List';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/actions';
import ReactPaginate from 'react-paginate';

class ListPage extends Component {
  componentDidMount() {
    this.props.actions.loadItems();
  }

  handlePageClick = (page) => {
    this.props.actions.loadItems({page: page.selected + 1});
  };

  deleteItem = (event, item) => {
    event.preventDefault();
    this.props.actions.deleteItem(item);
  };

  render() {
    const {pagingInfo: {page, pageCount}, isFetching} = this.props.items;
    let containerClassName = 'pagination';
    if (isFetching) {
      containerClassName += ' disabled';
    }
    return (
      <div>
        <Helmet title="Todo Items"/>
        <h2>Items</h2>
        <div className="btn-toolbar">
          <Link className="btn btn-primary" data-tooltip="Create new Item" to="/items/create">
            <span className="glyphicon glyphicon-plus"/> Create Item
          </Link>
        </div>
        <ItemsList items={this.props.items.list} deleteItem={this.deleteItem}/>
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={<a href="">...</a>}
          pageNum={pageCount}
          forceSelected={page}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          clickCallback={this.handlePageClick}
          containerClassName={containerClassName}
          activeClassName={"active"}
        />
      </div>
    );
  }
}

ListPage.propTypes = {
  actions: PropTypes.shape({
    loadItems : PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired
  }),
  items  : PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    list      : PropTypes.array.isRequired,
    pagingInfo: PropTypes.object.isRequired
  })
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
