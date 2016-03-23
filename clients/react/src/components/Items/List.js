import React, {PropTypes} from 'react';

const List = (props) => {
  const items = props.items.map(item => <li key={item.id}>{item.title}</li>);
  return (
      <div>
        <p>Items list goes here</p>
        <ul>{items}</ul>
      </div>
  );
};

List.propTypes = {
  items: PropTypes.array.isRequired
};

export default List;
