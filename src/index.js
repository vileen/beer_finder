import React  from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

import BeersList from './components/beers_list';
import BeerDetails from './components/beers_details';

export const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
    <Provider store={ store }>
        <BrowserRouter>
            <div className="main-div">
                <Switch>
                    <Route path="/beers/:id" component={ BeerDetails } modal={true} />
                    <Route path="/" component={ BeersList } />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.querySelector('.container')
);
