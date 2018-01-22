import React from 'react';
import Loading from './Loading';
import Logger from './Logger';

const handleLoadingAndErrors = WrappedComponent => {
  const EnhancedComponent = props => {
    if (props.data.loading) {
      return <Loading />;
    } else if (props.data.error) {
      return <Logger data={props.data} />;
    }
    return <WrappedComponent {...props} />;
  };

  return EnhancedComponent;
};

export default handleLoadingAndErrors;
