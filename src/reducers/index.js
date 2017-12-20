import { combineReducers } from 'redux';

import BeersReducer from './ReducerBeers';

const rootReducer = combineReducers({
    beers: BeersReducer
});

export default rootReducer;
