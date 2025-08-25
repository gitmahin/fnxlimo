import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  // TODO: change it to real baseURI
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache(),
});