import React from 'react';

const PositionDetail: React.FC = () => {
  const position = {
    id: 1,
    name: 'Software Engineer',
    department: 'Engineering',
  };

  return (
    <div>
      <h1>Position Detail</h1>
      <p><strong>ID:</strong> {position.id}</p>
      <p><strong>Name:</strong> {position.name}</p>
      <p><strong>Department:</strong> {position.department}</p>
    </div>
  );
};

export default PositionDetail;
