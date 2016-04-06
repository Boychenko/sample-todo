import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import ItemsListPage from './components/Items/ListPage';
import ItemEdit from './components/Items/EditPage';
import AboutPage from './components/AboutPage.js';
import NotFoundPage from './components/NotFoundPage.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={AboutPage}/>
    <Route path="items" component={ItemsListPage}/>
    <Route path="items/create" component={ItemEdit}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
