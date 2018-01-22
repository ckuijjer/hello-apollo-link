import React from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { RestLink } from 'apollo-link-rest';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import GitHubProfile from './GitHubProfile';

const authenticationHeader = {
  Authorization: `token ${process.env.REACT_APP_PERSONAL_ACCESS_TOKEN}`,
};

const restLink = new RestLink({
  uri: 'https://api.github.com',
  headers: {
    ...authenticationHeader,
  },
});

const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql',
  headers: {
    ...authenticationHeader,
  },
});

const client = new ApolloClient({
  link: ApolloLink.from([restLink, httpLink]),
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <div style={{ margin: 30 }}>
      <GitHubProfile login="ckuijjer" />
    </div>
  </ApolloProvider>
);

export default App;
