import React, {PropTypes} from 'react';

class ItemListRow extends React.Component {
  render() {
    const {item, priorities} = this.props;

    return (
      <tr>
        <td>{item.id}</td>
        <td>{item.title}</td>
        <td>{item.description}</td>
        <td>{priorities[item.priority]}</td>
        <td>{item.dueDate && new Date(item.dueDate).toLocaleDateString()}</td>
      </tr>
    );
  }
}

ItemListRow.propTypes = {
  item: PropTypes.object.isRequired,
  priorities: PropTypes.object.isRequired
};

export default ItemListRow;
