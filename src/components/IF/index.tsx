import React from 'react';

interface IFProps {
  condition: boolean;
  children: React.ReactNode;
  noDelete?: boolean;
}

export const IF = ({ condition, children, noDelete }: IFProps) => {
  if (!!noDelete) {
    return (
      <div style={{ display: condition ? 'block' : 'none' }}>{children}</div>
    );
  }
  return <>{!!condition ? children : null}</>;
};
