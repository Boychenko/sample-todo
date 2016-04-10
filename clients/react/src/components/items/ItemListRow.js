import React, {PropTypes} from 'react';

class ItemListRow extends React.Component {
  handleDeleteItemClick = (event) => {
    this.props.deleteItem(event, this.props.item);
  };

  render() {
    const {item, priorities} = this.props;

    return (
      <tr>
        <td>{item.id}</td>
        <td>{item.title}</td>
        <td>{item.description}</td>
        <td>{priorities[item.priority]}</td>
        <td>{item.dueDate && new Date(item.dueDate).toLocaleDateString()}</td>
        <td>
          <a href className="btn btn-default btn-xs" onClick={this.handleDeleteItemClick}>
            <span className="glyphicon glyphicon-trash"/>
          </a>
        </td>
      </tr>
    );
  }
}

ItemListRow.propTypes = {
  item      : PropTypes.object.isRequired,
  priorities: PropTypes.object.isRequired,
  deleteItem: PropTypes.func.isRequired
};

export default ItemListRow;
