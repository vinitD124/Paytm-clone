import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../slice/authReducer'


const rootReducer = combineReducers({
    auth:authReducer
})


export default rootReducer