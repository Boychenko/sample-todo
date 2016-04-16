import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import ItemsListPage from './components/Items/ListPage';
import ItemEdit from './components/Items/EditPage';
import AboutPage from './components/AboutPage';
import NotFoundPage from './components/NotFoundPage';
import CallbackPage from './components/CallbackPage';
import {requireAuth} from './helpers/oidcHelpers';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={AboutPage}/>
    <Route path="items" component={ItemsListPage} onEnter={requireAuth}/>
    <Route path="items/create" component={ItemEdit}/>
    <Route path="callback" component={CallbackPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
