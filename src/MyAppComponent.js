import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Logger from './Logger';

const QUERY = gql`
  query {
    user(login:"ckuijjer") {
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


const MyAppComponent = (props) => (
  <Logger data={props} />
);

export default graphql(QUERY)(MyAppComponent);