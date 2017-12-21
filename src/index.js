import React  from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import BeersList from './components/BeersList';
import reducers from './reducers';


const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
export const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
    <Provider store={ store }>
        <BeersList />
    </Provider>
    , document.querySelector('.container')
);
