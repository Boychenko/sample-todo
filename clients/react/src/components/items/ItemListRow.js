import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import ColoredFlag from '../common/ColoredFlag';

class ItemListRow extends React.Component {
  handleDeleteItemClick = (event) => {
    this.props.deleteItem(event, this.props.item);
  };

  handleMarkItemCompletedClick = (event) => {
    this.props.markItemCompleted(event, this.props.item);
  };

  render() {
    const {item, priorities} = this.props;
    let completeButton;
    if (!item.completed) {
      completeButton = (
        <a href="" className="btn btn-default btn-xs" onClick={this.handleMarkItemCompletedClick}>
          <span className="glyphicon glyphicon-ok"/>
        </a>);
    }

    return (
      <tr>
        <td><ColoredFlag value={item.completed}/></td>
        <td>{item.id}</td>
        <td>{item.title}</td>
        <td>{item.description}</td>
        <td>{priorities[item.priority]}</td>
        <td>{item.dueDate && new Date(item.dueDate).toLocaleDateString()}</td>
        <td>
          <Link to={`/items/edit/${item.id}`} className="btn btn-default btn-xs">
            <span className="glyphicon glyphicon-pencil"/>
          </Link>
          <a href="" className="btn btn-default btn-xs" onClick={this.handleDeleteItemClick}>
            <span className="glyphicon glyphicon-trash"/>
          </a>
          {completeButton}
        </td>
      </tr>
    );
  }
}

ItemListRow.propTypes = {
  item             : PropTypes.object.isRequired,
  priorities       : PropTypes.object.isRequired,
  deleteItem       : PropTypes.func.isRequired,
  markItemCompleted: PropTypes.func.isRequired
};

export default ItemListRow;
