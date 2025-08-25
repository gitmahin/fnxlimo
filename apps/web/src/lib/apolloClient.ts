import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  // TODO: change it to real baseURI
  uri: 'https://finixlimo.com/api/graphql',
  cache: new InMemoryCache(),
});