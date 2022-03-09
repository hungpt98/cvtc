import { ApolloClient, InMemoryCache } from '@apollo/client'

const apolloClient = new ApolloClient({
  uri: 'https://corona-api.kompa.ai/graphql',
  cache: new InMemoryCache(),
})

export default apolloClient
