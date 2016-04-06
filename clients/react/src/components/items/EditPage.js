import React, {Component, PropTypes} from 'react';
import EditForm from './EditForm';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/actions';

class EditPage extends Component {
  save = (data) => {
    ////TODO: find out better way to handle data
    return this.props.actions.saveItem({...data, dueDate: new Date(Number(data.dueDate))});
  };

  render() {
    return (
      <EditForm save={this.save}/>
    );
  }
}


EditPage.propTypes = {
  actions: PropTypes.shape({
    saveItem: PropTypes.func.isRequired
  })
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
