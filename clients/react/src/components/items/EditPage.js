import React, {Component, PropTypes} from 'react';
import EditForm from './EditForm';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/actions';
import priorities from '../../constants/priorities';

class EditPage extends Component {
  save = (data) => {
    ////TODO: find out better way to handle data
    return this.props.actions.saveItem({...data, dueDate: new Date(Number(data.dueDate))});
  };

  cancel = () => {
    this.context.router.goBack();
  };

  render() {
    return (
      <EditForm save={this.save} cancel={this.cancel} priorities={priorities}/>
    );
  }
}

EditPage.propTypes = {
  actions: PropTypes.shape({
    saveItem: PropTypes.func.isRequired
  })
};

EditPage.contextTypes = {
  router: PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(EditPage);
