import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';

import Loading from './Loading';
import GitHubRepository from './GitHubRepository';

const QUERY = gql`
  query GithubUser($login: String!) {
    user(login: $login) {
      name
      login
      bio

      repositories(first: 10) {
        edges {
          node {
            id
            ...GitHubRepository
          }
        }
      }
    }
  }
  ${GitHubRepository.fragments.repository}  
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
        {data.user.repositories.edges.map(({ node }) =>
          <GitHubRepository key={node.id} repository={filter(GitHubRepository.fragments.repository, node)} />
        )}
      </div>
    )
  }
};

export default graphql(QUERY, { options: { variables: { login } } })(GithubUser);