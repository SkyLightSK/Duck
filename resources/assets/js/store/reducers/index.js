import {combineReducers} from 'redux'
import Auth from './Auth'
import TimeTrack from './TimeTrack'
import persistStore from './persistStore'

const RootReducer = combineReducers({Auth,persistStore,TimeTrack});

export default RootReducer;