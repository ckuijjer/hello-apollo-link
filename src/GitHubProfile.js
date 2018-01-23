import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
import { path } from 'ramda';

import handleLoadingAndErrors from './handleLoadingAndErrors';
import GitHubRepository from './GitHubRepository';
import GitHubUser from './GitHubUser';
import Logger from './Logger';

const USE_REST = true;

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
    }
  }
  ${GitHubRepository.fragments.repository}
  ${GitHubUser.fragments.user}
`;

const REST_QUERY = gql`
  query GitHubProfile($login: String!) {
    user(login: $login) @rest(path: "/users/:login", type: "User") {
      id
      login @export(as: "login")
      ...GitHubUser

      repositories @rest(path: "/users/:login/repos", type: "Repository") {
        id
        ...GitHubRepository
      }

      following @rest(path: "/users/:login/following", type: "Followee") {
        id
        login @export(as: "followee")
        user(login: $followee) @rest(path: "/users/:followee", type: "User") {
          id
          ...GitHubUser
        }
      }
    }
  }
  ${GitHubRepository.fragments.repository}
  ${GitHubUser.fragments.user}
`;

const query = USE_REST ? REST_QUERY : QUERY;
const getRepositoryEdges = path(
  USE_REST ? ['user', 'repositories'] : ['user', 'repositories', 'edges']
);
const getFollowingEdges = path(
  USE_REST ? ['user', 'following'] : ['user', 'following', 'edges']
);
const getNode = path(USE_REST ? [] : ['node']);

const title = USE_REST
  ? 'Using the RESTful GitHub v3 API'
  : 'Using the GraphQL GitHub v4';

const GitHubProfile = ({ data }) => {
  return (
    <div>
      <h1>{title}</h1>
      <h2>User</h2>
      <GitHubUser {...filter(GitHubUser.fragments.user, data.user)} />

      <h2>Repositories</h2>
      {getRepositoryEdges(data)
        .map(getNode)
        .map(node => (
          <GitHubRepository
            key={node.id}
            repository={filter(GitHubRepository.fragments.repository, node)}
          />
        ))}

      <h2>Following</h2>
      {getFollowingEdges(data)
        .map(getNode)
        .map(node => (
          <GitHubUser
            key={node.login}
            {...filter(GitHubUser.fragments.user, node.user)}
          />
        ))}

      <h2>Logger</h2>
      <Logger data={data} />
    </div>
  );
};

export default graphql(query, {
  options: ({ login }) => ({ variables: { login } }),
})(handleLoadingAndErrors(GitHubProfile));
