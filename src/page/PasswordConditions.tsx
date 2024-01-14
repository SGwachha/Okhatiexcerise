// PasswordConditions.tsx

import React from 'react';

interface PasswordConditionsProps {
  conditions: boolean[];
}

const PasswordConditions: React.FC<PasswordConditionsProps> = ({ conditions }) => {
  const conditionLabels = [
    'At least 8 characters long',
    'Contains at least one numeric character',
    'Contains at least one special character',
  ];

  return (
    <ul style={{margin:0,padding:0, listStyleType: 'none', float:'left'}}>
      {conditions.map((condition, index) => (
        <li key={index} style={{ color: condition ? 'green' : 'red' }}>
          {condition ? '\u2713' : '\u2022'} {conditionLabels[index]}
        </li>
      ))}
    </ul>
  );
};

export default PasswordConditions;
