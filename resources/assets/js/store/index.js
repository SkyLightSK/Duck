import {applyMiddleware,createStore,compose} from 'redux'
import logger from 'redux-logger'
import RootReducer from './reducers'
import ReduxThunk from 'redux-thunk'
import {autoRehydrate,persistStore} from 'redux-persist'

import { composeWithDevTools } from 'redux-devtools-extension';


const store = createStore(
    RootReducer,
    composeWithDevTools( //for removing devtools just "compose" :3
        applyMiddleware(ReduxThunk,logger),
        autoRehydrate()
    )
);
persistStore(store);
export default store;