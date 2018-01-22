import React from 'react';
import gql from 'graphql-tag';

const GitHubUser = ({ name, login, bio }) => {
  return (
    <div>
      <div>Name: {name}</div>
      <div>Login: {login}</div>
      <div>Bio: {bio}</div>
    </div>
  );
};

GitHubUser.fragments = {
  user: gql`
    fragment GitHubUser on User {
      name
      login
      bio
    }
  `,
};

export default GitHubUser;
