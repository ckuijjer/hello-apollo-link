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

const GitHubProfileREST = ({ data }) => {
  return (
    <div>
      <h1>Using the RESTful GitHub v3 API</h1>
      <h2>User</h2>
      <GitHubUser {...filter(GitHubUser.fragments.user, data.user)} />

      <h2>Repositories</h2>
      {data.user.repositories.map(node => (
        <GitHubRepository
          key={node.id}
          repository={filter(GitHubRepository.fragments.repository, node)}
        />
      ))}

      <h2>Following</h2>
      {data.user.following.map(node => (
        <GitHubUser
          key={node.id}
          {...filter(GitHubUser.fragments.user, node.user)}
        />
      ))}

      <h2>Logger</h2>
      <Logger data={data} />
    </div>
  );
};

export default graphql(QUERY, {
  options: ({ login }) => ({ variables: { login } }),
})(handleLoadingAndErrors(GitHubProfileREST));
