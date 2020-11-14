import { FACEBOOKUSER } from '../const/index';

const INITIAL_STATE = {
    users: [],
    currUser: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FACEBOOKUSER:
            return ({
                ...state,
                currUser: action.payload
            })
        default:
            return state;
    }
}