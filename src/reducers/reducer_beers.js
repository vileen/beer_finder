import _ from 'lodash';

import { FETCH_BEERS, FETCH_BEER, SEARCH_BEERS } from '../actions';

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_BEER:
            return { ...state, [action.payload.data[0].id]: action.payload.data[0] };
        case FETCH_BEERS:
            return _.merge({}, state, _.mapKeys(action.payload.data, "id"));
        case SEARCH_BEERS:
            return _.mapKeys(action.payload.data, "id");
        default:
            return state;
    }
}