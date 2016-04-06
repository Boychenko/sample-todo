import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import {reduxForm} from 'redux-form';
//import {DateTimePicker} from 'react-widgets';
import DateTimeField from 'react-bootstrap-datetimepicker';

class EditForm extends Component {
  componentWillMount() {
    this.props.initializeForm({
      dueDate  : new Date(),
      completed: false,
      priority : 0
    });
  }

  render() {
    const {fields: {title, dueDate, priority, completed, description},
      submitting,
      handleSubmit,
      save,
      resetForm
      } = this.props;

    const priorities = {0: 'Low', 1: 'Medium', 2: 'High', 3: 'Urgent'};
    const options = Object.keys(priorities).map(key => <option key={key} value={key}>{priorities[key]}</option>);
    return (
      <form onSubmit={handleSubmit(save)}>
        <div className="row">
          <div className="col-xs-6">
            <div className="form-group">
              <label className="control-label">Title</label>
              <input type="text" className="form-control" placeholder="Title" {...title}/>
            </div>
            <div className="form-group">
              <label className="control-label">Due Date</label>
              <DateTimeField className="form-control" {...dueDate}
                value={moment(dueDate.value).toDate() || new Date()}
                mode={'date'}
                inputProps={{disabled: 'disabled'}}
              />
            </div>
            <div className="form-group">
              <label className="control-label">Priority</label>
              <select className="form-control" {...priority} value={priority.value || ''}>
                {options}
              </select>
            </div>
            <div className="checkbox">
              <label>
                <input type="checkbox" {...completed}/> Completed
              </label>
            </div>
            <div className="form-group">
              <label className="control-label">Notes</label>
              <div>
                <textarea className="form-control" {...description} value={description.value || ''}/>
              </div>
            </div>
            <button type="submit" disabled={submitting} style={{margin: '0 2px 0 0'}} className="btn btn-primary">
              Save
            </button>
            <button disabled={submitting} style={{margin: '0 0 0 2px'}} className="btn btn-default" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    );
  }
}

EditForm.propTypes = {
  fields        : PropTypes.object.isRequired,
  handleSubmit  : PropTypes.func.isRequired,
  initializeForm: PropTypes.func.isRequired,
  resetForm     : PropTypes.func.isRequired,
  submitting    : PropTypes.bool.isRequired,
  save          : PropTypes.func.isRequired
};

EditForm = reduxForm({
  form         : 'itemForm',
  fields       : ['title', 'dueDate', 'priority', 'completed', 'description'],
  touchOnChange: true
})(EditForm);

export default EditForm;
