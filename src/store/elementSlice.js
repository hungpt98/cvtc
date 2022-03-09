import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
  headerElementClientHeight: 0,
}

const elementSlice = createSlice({
  name: 'elementStore',
  initialState: INITIAL_STATE,
  reducers: {
    headerElementSuccess(state, action) {
      const headerElementClientHeight = action.payload
      state.headerElementClientHeight = headerElementClientHeight
    },
  },
})

const { reducer, actions } = elementSlice

export const { headerElementSuccess } = actions

export default reducer
