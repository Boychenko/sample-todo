import React, {Component, PropTypes} from 'react';
import EditForm from './EditForm';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/actions';
import {asyncConnect} from 'redux-async-connect';
import {isLoaded as isReferencesLoaded} from '../../reducers/referencesReducer';
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
      <EditForm
        save={this.save}
        cancel={this.cancel}
        priorities={this.props.priorities}
        initialValues={this.props.item}
      />
    );
  }
}

EditPage.propTypes = {
  actions   : PropTypes.shape({
    saveItem: PropTypes.func.isRequired
  }),
  item      : PropTypes.object.isRequired,
  priorities: PropTypes.object.isRequired
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
    item,
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
)(EditPage);

export default asyncConnect([{
  promise : ({store: {dispatch, getState}, params}) => {
    const promises = [];
    promises.push(Promise.resolve(dispatch(actions.editItem(params.id))));

    if (!isReferencesLoaded(getState())) {
      promises.push(dispatch(actions.loadReferences()));
    }

    return Promise.all(promises);
  }

}])(connectedPage);
