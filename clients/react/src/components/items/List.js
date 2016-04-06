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
        <ItemListRow key={item.id} item={item} priorities={priorities}/>
      )}
      </tbody>
    </table>
  );
};

List.propTypes = {
  items: PropTypes.array.isRequired
};

export default List;
