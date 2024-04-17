import React from "react";

interface CheckboxItem {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckboxList: React.FC<CheckboxItem> = ({ label, checked, onChange }) => {

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };


  return <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleOnChange}
        className="accent-black h-[24px] w-[24px] my-[10px] bg-[#CCCCCC]"
      />
      <span>{label}</span>
    </label>
};

export default CheckboxList;
