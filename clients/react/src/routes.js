import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import ItemsListPage from './containers/ItemsListPage';
import AboutPage from './components/AboutPage.js';
import NotFoundPage from './components/NotFoundPage.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={AboutPage}/>
    <Route path="about" component={ItemsListPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
