import React, {Component, PropTypes} from 'react';
import EditForm from './EditForm';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/actions';
import priorities from '../../constants/priorities';
import {asyncConnect} from 'redux-async-connect';
import moment from 'moment';

class EditPage extends Component {
  save = (data) => {
    ////TODO: find out better way to handle data
    const saveData = {...this.props.item, ...data, dueDate: new Date(Number(data.dueDate))};
    return this.props.actions.saveItem(saveData);
  };

  cancel = () => {
    this.context.router.goBack();
  };

  render() {
    return (
      <EditForm save={this.save} cancel={this.cancel} priorities={priorities} initialValues={this.props.item}/>
    );
  }
}

EditPage.propTypes = {
  actions: PropTypes.shape({
    saveItem: PropTypes.func.isRequired
  }),
  item   : PropTypes.object.isRequired
};

EditPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  const item = state.items.editItem;
  if (item && item.dueDate) {
    item.dueDate = moment(state.items.editItem.dueDate).valueOf();
  }
  return {
    item
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
)(EditPage);

export default asyncConnect([{
  deferred: true,
  promise : ({store: {dispatch/*, getState*/}, params}) => {
    dispatch(actions.editItem(params.id));
  }

}])(connectedPage);
