/**
 * Created by kopel on 11.03.2018.
 */
import * as ActionTypes from '../action-types'
import Http from '../../Http'

const timeTrack = {
    id: null,
    user_id: null,
    started_at: null,
    ended_at: null,
    total_hours: null,
    active: null,
    createdAt: null,
    updatedAt: null
};

const initialState = {
    // isAuthenticated : false,
    // isAdmin: false,
    // user
    userStartedTime:localStorage.getItem('id'),
    timeTrack
};

export const TimeTrack = (state= initialState,{type,payload = null}) => {
    switch(type){
        case ActionTypes.USER_STARTED_TIME:
            return userStartedTime(state,payload);
        default:
            return state;
    }
};

const userStartedTime = (state,payload) => {
    const jwtToken = payload.token;
    const timeTrack = payload.timeTrack[0];

    localStorage.setItem('jwt_token',jwtToken);
    Http.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
    state = Object.assign({}, state, {
        isAuthenticated: true,
        isAdmin: localStorage.getItem('is_admin') === 'true',
        user
    });
    return state;

};