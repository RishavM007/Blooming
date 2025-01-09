// app/lib/apolloClient.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://demo.bixeltek.com/headless/graphql',  
  }),
  cache: new InMemoryCache(),
});

export default client;
