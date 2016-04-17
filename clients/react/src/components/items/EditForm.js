import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import {reduxForm} from 'redux-form';
import DateTimeField from 'react-bootstrap-datetimepicker';
import itemValidation from './itemValidation';

class EditForm extends Component {
  render() {
    const {fields: {title, dueDate, priority, completed, description},
      priorities,
      submitting,
      invalid,
      handleSubmit,
      save,
      cancel
      } = this.props;

    const options = Object.keys(priorities).map(key => <option key={key} value={key}>{priorities[key]}</option>);
    return (
      <form onSubmit={handleSubmit(save)}>
        <div className="row">
          <div className="col-xs-6">
            <div className={`form-group${(title.touched && title.error ? ' has-error' : '')}`}>
              <label className="control-label">Title</label>
              <input type="text" className="form-control" placeholder="Title" {...title}/>
              {title.touched && title.error && <span className="help-block">{title.error}</span>}
            </div>
            <div className="form-group">
              <label className="control-label">Due Date</label>
              <DateTimeField
                className="form-control"
                {...dueDate}
                defaultText={moment(dueDate.value).format('x')}
                dateTime={moment(dueDate.value).format('x')}
                value={moment(dueDate.value).toDate()}
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
            <button
              type="submit"
              disabled={submitting || invalid}
              style={{margin: '0 2px 0 0'}}
              className="btn btn-primary"
            >
              Save
            </button>
            <a disabled={submitting} style={{margin: '0 0 0 2px'}} className="btn btn-default" onClick={cancel}>
              Cancel
            </a>
          </div>
        </div>
      </form>
    );
  }
}

EditForm.propTypes = {
  priorities  : PropTypes.object.isRequired,
  fields      : PropTypes.object.isRequired,
  invalid     : PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm   : PropTypes.func.isRequired,
  submitting  : PropTypes.bool.isRequired,
  save        : PropTypes.func.isRequired,
  cancel      : PropTypes.func.isRequired
};

EditForm = reduxForm({
  form         : 'itemForm',
  fields       : ['title', 'dueDate', 'priority', 'completed', 'description'],
  validate     : itemValidation,
  touchOnChange: true
})(EditForm);

export default EditForm;
