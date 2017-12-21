import _ from 'lodash';

import { FETCH_BEERS, SEARCH_BEERS } from '../actions';

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_BEERS:
            if (action.payload.data.length) {
                return _.merge({}, state, _.mapKeys(action.payload.data, "id"));
            } else {
                // some way to inform about the last element
                return { ...state, 999999: null };
            }
        case SEARCH_BEERS:
            return _.mapKeys(action.payload.data, "id");
        default:
            return state;
    }
}