import React, {PropTypes} from 'react';
import ItemListRow from './ItemListRow';
import ItemListHeader from './ItemListHeader';
import priorities from '../../constants/Priorities';

const List = (props) => {
  return (
    <table className="table table-striped table-hover">
      <ItemListHeader/>
      <tbody>
      {props.items.map(item =>
        <ItemListRow key={item.id} item={item} priorities={priorities} deleteItem={props.deleteItem}/>
      )}
      </tbody>
    </table>
  );
};

List.propTypes = {
  items     : PropTypes.array.isRequired,
  deleteItem: PropTypes.func.isRequired
};

export default List;
