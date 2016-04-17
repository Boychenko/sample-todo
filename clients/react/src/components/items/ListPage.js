import React, {Component, PropTypes} from 'react';
import ItemsList from './List';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/actions';
import ReactPaginate from 'react-paginate';
import {isLoaded as isReferencesLoaded} from '../../reducers/referencesReducer';
import CreateButton from '../common/CreateButton';

class ListPage extends Component {
  componentDidMount() {
    this.props.actions.loadItems();
  }

  handlePageClick = (page) => {
    this.props.actions.loadItems({page: page.selected + 1});
  };

  deleteItem = (event, item) => {
    event.preventDefault();
    const {pagingInfo: {page}} = this.props.items;
    this.props.actions.deleteItem(item, {page: page + 1});
  };

  render() {
    const {pagingInfo: {page, pageCount}} = this.props.items;
    let containerClassName = 'pagination';

    return (
      <div>
        <Helmet title="Todo Items"/>
        <h2>Items</h2>
        <CreateButton text="Create Item" link="/items/create"/>
        <ItemsList items={this.props.items.list} priorities={this.props.priorities} deleteItem={this.deleteItem}/>
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
  actions   : PropTypes.shape({
    loadItems : PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired
  }),
  priorities: PropTypes.array.isRequired,
  items     : PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    list      : PropTypes.array.isRequired,
    pagingInfo: PropTypes.object.isRequired
  })
};

function mapStateToProps(state) {
  return {
    items     : state.items.paging,
    priorities: state.references.priorities
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

const connectedPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPage);

export default asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    if (!isReferencesLoaded(getState())) {
      return dispatch(actions.loadReferences());
    }
    return undefined;
  }

}])(connectedPage);
