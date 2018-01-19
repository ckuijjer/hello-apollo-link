import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Logger from './Logger';

const GitHubRepository = ({ repository }) => {
  const { name, url } = repository;
  return (
    <div style={{ marginBottom: 16 }}>
      <div>Name: {name}</div>
      <div>Url: <a href={url}>{url}</a></div>
    </div >
  )
};

GitHubRepository.fragments = {
  repository: gql`
    fragment GitHubRepository on Repository {
      name
      url
    }
  `
}

export default GitHubRepository;
