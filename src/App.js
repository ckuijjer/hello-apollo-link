import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import MyAppComponent from './MyAppComponent';

console.log('🔑', process.env.REACT_APP_PERSONAL_ACCESS_TOKEN)

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
      Authorization: `token ${process.env.REACT_APP_PERSONAL_ACCESS_TOKEN}`
    }
  }),
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <MyAppComponent />
  </ApolloProvider>
);

export default App;
