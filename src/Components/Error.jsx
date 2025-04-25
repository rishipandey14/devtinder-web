import React from 'react';

const Error = ({err}) => {
  return (
    <div className="text-center text-red-500 font-semibold text-lg mt-10">
      {err}
    </div>
  );
};

export default Error;
