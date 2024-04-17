import React from 'react';

type FormProps = {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const Form: React.FC<FormProps> = ({ children, onSubmit }) => (
  <form onSubmit={onSubmit} className="bg-white rounded px-8 pt-6 pb-8 mb-4 text-left">
    {children}
  </form>
);

export default Form;
