import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const client = new ApolloClient({
  link: new HttpLink({
    uri: `${publicRuntimeConfig.API_URL}/graphql`,
  }),
  cache: new InMemoryCache(),
});

export default client;