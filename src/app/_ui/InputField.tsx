import React from 'react'

interface InputFieldProps {
    label : string;
    type : string;
    placeholder : string;
    name : string;
    value : string;
    onChange : (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField : React.FC<InputFieldProps> = ({ label, type, placeholder, name, value, onChange }) => (
    <div className="mb-[20px]">
      <label htmlFor={name} className='block mb-1'>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="appearance-none border h-[48px] border-[#C1C1C1] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
  
  export default InputField;
  