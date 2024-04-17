import React from 'react';

type ButtonProps = {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

const Button: React.FC<ButtonProps> = ({ text, onClick, type = 'button' }) => (
  <button
    onClick={onClick}
    type={type}
    className="bg-black hover:bg-gray-800 w-full h-[56px] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-[20px]"
  >
    {text}
  </button>
);

export default Button;