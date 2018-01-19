import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Loading from './Loading';
import Logger from './Logger';

const QUERY = gql`
  query {
    user(login:"ckuijjer") {
      name
      login
      bio

      repositories(first: 10) {
        edges {
          node {
            name
            url
          }
        }
      }
    }
  }
`;


const GithubUser = ({ data }) => {
  if (data.loading) {
    return <Loading />
  } else {
    return (
      <div style={{ margin: 30 }}>
        <h2>User</h2>
        <div>Name: {data.user.name}</div>
        <div>Login: {data.user.login}</div>
        <div>Bio: {data.user.bio}</div>
        <h2>Repositories</h2>
        <Logger data={data} />
      </div>
    )
  }
};

export default graphql(QUERY)(GithubUser);