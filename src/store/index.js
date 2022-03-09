import { configureStore } from '@reduxjs/toolkit'
import covidReducer from './covidSlice'
import elementReducer from './elementSlice'

const rootReducer = {
  covidStore: covidReducer,
  elementStore: elementReducer,
}

export default configureStore({
  reducer: rootReducer,
})
