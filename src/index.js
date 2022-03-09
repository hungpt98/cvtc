import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import apolloClient from 'api/apolloClient'
import reportWebVitals from './reportWebVitals'
import App from './App'
import { ApolloProvider } from '@apollo/client'
import 'leaflet/dist/leaflet.css'

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('app')
)

reportWebVitals()
