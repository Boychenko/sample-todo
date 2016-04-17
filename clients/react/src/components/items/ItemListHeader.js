import React from 'react';

const ItemListHeader = () => {
  return (
    <thead>
      <tr>
        <th>Completed</th>
        <th>ID</th>
        <th>Title</th>
        <th>Description</th>
        <th>Priority</th>
        <th>Due Date</th>
        <th>&nbsp;</th>
      </tr>
    </thead>
  );
};

export default ItemListHeader;
