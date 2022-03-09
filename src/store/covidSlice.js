import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { covidApi } from 'api/axiosApis'

export const getGlobalCases = createAsyncThunk(
  'covidStore/getGlobalCases',
  async () => {
    try {
      const data = await covidApi.getAll()
      return data
    } catch (error) {
      console.log('Fetch failed: ', error)
    }
  }
)

export const getCountriesCases = createAsyncThunk(
  'covidStore/getCountriesCases',
  async () => {
    try {
      const data = await covidApi.getCountries()
      return data
    } catch (error) {
      console.log('Fetch failed: ', error)
    }
  }
)

const INITIAL_STATE = {
  globalCases: {
    data: {},
    promiseStatus: null,
  },
  countriesCases: {
    data: [],
    promiseStatus: null,
  },
}

const covidSlice = createSlice({
  name: 'covidStore',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: {
    [getGlobalCases.pending]: (state) => {
      state.globalCases = {
        ...state.globalCases,
        promiseStatus: 'pending',
      }
    },
    [getGlobalCases.fulfilled]: (state, action) => {
      state.globalCases = {
        data: action.payload,
        promiseStatus: 'fulfilled',
      }
    },
    [getGlobalCases.rejected]: (state) => {
      state.globalCases = {
        ...state.globalCases,
        promiseStatus: 'rejected',
      }
    },
    [getCountriesCases.pending]: (state) => {
      state.countriesCases = {
        ...state.countriesCases,
        promiseStatus: 'pending',
      }
    },
    [getCountriesCases.fulfilled]: (state, action) => {
      state.countriesCases = {
        data: action.payload,
        promiseStatus: 'fulfilled',
      }
    },
    [getCountriesCases.rejected]: (state) => {
      state.countriesCases = {
        ...state.countriesCases,
        promiseStatus: 'rejected',
      }
    },
  },
})

const { reducer } = covidSlice

export default reducer
