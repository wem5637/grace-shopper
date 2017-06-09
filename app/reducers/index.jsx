import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  homes: require('./homes').default,
  availability: require('./availability').default,
  transactions: require('./transactions').default,
  users: require('./users').default
})

export default rootReducer
