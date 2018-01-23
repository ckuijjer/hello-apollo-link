import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';

import handleLoadingAndErrors from './handleLoadingAndErrors';
import GitHubRepository from './GitHubRepository';
import GitHubUser from './GitHubUser';
import Logger from './Logger';

const QUERY = gql`
  query GitHubProfile($login: String!) {
    user(login: $login) {
      login
      ...GitHubUser

      repositories(first: 10) {
        edges {
          node {
            id
            ...GitHubRepository
          }
        }
      }

      following(first: 10) {
        edges {
          node {
            id
            ...GitHubUser
          }
        }
      }
    }
  }
  ${GitHubRepository.fragments.repository}
  ${GitHubUser.fragments.user}
`;

const GitHubProfile = ({ data }) => {
  return (
    <div>
      <h1>Using the GraphQL GitHub v4</h1>
      <h2>User</h2>
      <GitHubUser {...filter(GitHubUser.fragments.user, data.user)} />

      <h2>Repositories</h2>
      {data.user.repositories.edges.map(edge => (
        <GitHubRepository
          key={edge.node.id}
          repository={filter(GitHubRepository.fragments.repository, edge.node)}
        />
      ))}

      <h2>Following</h2>
      {data.user.following.edges.map(edge => (
        <GitHubUser
          key={edge.node.id}
          {...filter(GitHubUser.fragments.user, edge.node)}
        />
      ))}

      <h2>Logger</h2>
      <Logger data={data} />
    </div>
  );
};

export default graphql(QUERY, {
  options: ({ login }) => ({ variables: { login } }),
})(handleLoadingAndErrors(GitHubProfile));
