import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
import { path } from 'ramda';

import handleLoadingAndErrors from './handleLoadingAndErrors';
import GitHubRepository from './GitHubRepository';
import Logger from './Logger';

const USE_REST = true;

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

const REST_QUERY = gql`
  query GithubUser($login: String!) {
    #user @rest(path: "/users/:login", params: { login: $login }, type: "User") {
    user @rest(path: "/users/ckuijjer", type: "User") {
      name
      login
      bio

      repositories @rest(path: "/users/ckuijjer/repos", type: Repository) {
        id
        ...GitHubRepository
      }
    }
  }
  ${GitHubRepository.fragments.repository}
`;

const query = USE_REST ? REST_QUERY : QUERY;
const getEdges = path(USE_REST ? ['user', 'repositories'] : ['user', 'repositories', 'edges']);
const getNode = path(USE_REST ? [] : ['node']);
const title = USE_REST ? 'Using the RESTful GitHub v3 API' : 'Using the GraphQL GitHub v4';

const GithubUser = ({ data }) => (
  <div>
    <h1>{title}</h1>
    <h2>User</h2>
      <div>Name: {data.user.name}</div>
      <div>Login: {data.user.login}</div>
      <div>Bio: {data.user.bio}</div>

      <h2>Repositories</h2>
      {getEdges(data).map(getNode).map(node =>
        <GitHubRepository key={node.id} repository={filter(GitHubRepository.fragments.repository, node)} />
      )}

      <h2>Logger</h2>
      <Logger data={data} />
  </div>
    );

export default graphql(query, {options: ({login}) => ({variables: {login} }) })(handleLoadingAndErrors(GithubUser));