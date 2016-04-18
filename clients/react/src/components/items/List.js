import React, {PropTypes} from 'react';
import ItemListRow from './ItemListRow';
import ItemListHeader from './ItemListHeader';

const List = (props) => {
  return (
    <table className="table table-striped table-hover">
      <ItemListHeader/>
      <tbody>
      {props.items.map(item =>
        <ItemListRow
          key={item.id}
          item={item}
          priorities={props.priorities}
          deleteItem={props.deleteItem}
          markItemCompleted={props.markItemCompleted}
        />
      )}
      </tbody>
    </table>
  );
};

List.propTypes = {
  items            : PropTypes.array.isRequired,
  deleteItem       : PropTypes.func.isRequired,
  priorities       : PropTypes.object.isRequired,
  markItemCompleted: PropTypes.func.isRequired
};

export default List;
