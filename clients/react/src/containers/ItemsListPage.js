import React, {Component} from 'react';
import ItemsList from '../components/ItemsList';

export default class ItemsListPage extends Component {
  render() {
    return (
      <div>
        <h2>Items</h2>
        <ItemsList/>
      </div>
    );
  }
}
