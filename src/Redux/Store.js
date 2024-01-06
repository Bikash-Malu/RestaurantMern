import { createStore,combineReducers,applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { rootReducer } from './rootReducer'
const finalreducer=combineReducers({rootReducer})
const initialState={
    rootReducer:{
        cardItems:localStorage.getItem("cardItems")
        ?JSON.parse(localStorage.getItem("cardItems"))
        :[]
    }
}
const middleware=[thunk]
const store=createStore(finalreducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))
export default store;