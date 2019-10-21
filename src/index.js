import 'es6-shim'; // yeah, polyfill all the things !!!
import 'whatwg-fetch'; // yeah, polyfill all the things !!!
import Symbol from 'es-symbol';
import React from 'react';
import ReactDOM from 'react-dom';
// import redux-thunk
import thunk from 'redux-thunk';
// import react-redux
import { Provider } from 'react-redux';
// import the previously created reducer
import { reducer } from './reducers';
// import stuff from redux
import { createStore, applyMiddleware } from 'redux';
// import some stuff to sync the react-router with redux
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { WineApp, RegionsPage, WineListPage, WinePage, NotFound } from './components';
import './index.css';
if (!window.Symbol) {
  window.Symbol = Symbol; // yeah, polyfill all the things !!!
}

// here we create de redux store while applying the `redux-thunk` middleware
const store = createStore(reducer, applyMiddleware(thunk));
// here we create an history that will be syncrhonized with the redux store
const history = syncHistoryWithStore(browserHistory, store);

class RoutedApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={WineApp}>
            <IndexRoute component={RegionsPage} />
            <Route path="regions/:regionId" component={WineListPage} />
            <Route path="regions/:regionId/wines/:wineId" component={WinePage} />
            <Route path="*" component={NotFound} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<RoutedApp />, document.getElementById('root'));