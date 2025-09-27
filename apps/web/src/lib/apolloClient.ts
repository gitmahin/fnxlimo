import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: `${process.env.BASE_URL}/api/graphql`,
  cache: new InMemoryCache(),
});
