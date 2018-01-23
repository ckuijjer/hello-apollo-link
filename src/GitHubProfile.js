import React from 'react';

import GitHubProfileREST from './GitHubProfileREST';
import GitHubProfileGraphQL from './GitHubProfileGraphQL';

const GitHubProfile = ({ user, method }) => (
  <div>
    {method === 'rest' ? (
      <GitHubProfileREST login={user} />
    ) : (
      <GitHubProfileGraphQL login={user} />
    )}
  </div>
);

export default GitHubProfile;
