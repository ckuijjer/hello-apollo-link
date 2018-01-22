import React from 'react';

const Logger = ({ data }) => {
  const json = JSON.stringify(data, null, 2);

  return <pre>{json}</pre>;
};

export default Logger;
