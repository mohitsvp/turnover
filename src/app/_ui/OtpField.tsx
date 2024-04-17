"use client";

import React, { useEffect, useRef } from "react";

interface OtpFieldProps {
    onChange : (otp : string) => void
}

const OtpField : React.FC<OtpFieldProps> = ({onChange}) => {
  const numInputs = 8;
  const inputsRef = useRef<HTMLInputElement[] | any>([]);

  const focusNextInput = (index: number, value: string) => {
    if (index < numInputs - 1 && value && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1].focus();
    }
  };

  const focusPrevInput = (index: number, value: string) => {
    if (index > 0 && value === "" && inputsRef.current[index - 1]) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleChange = (e: any, index: number) => {
    const { value } = e.target;
    if (value.length <= 1) {
      focusNextInput(index, value);
    } else if (value.length === 0) {
      focusPrevInput(index, value);
    }
    updateOtpValue()
  };

  const handleKeyDown = (e : any, index: number) => {
    if (e.key === "Backspace") {
      focusPrevInput(index, e.target.value);
    }
    updateOtpValue()
  };

  const updateOtpValue = () => {
    const otp = Array.from(inputsRef.current).map((input : any) => input.value).join('');
    onChange(otp);
  };

  useEffect(() => {
    inputsRef.current = inputsRef.current.slice(0, numInputs);
  }, []);

  return (
    <div className="mb-[20px] text-left">
      <label className="mb-1 block">Code</label>
      <div className="flex justify-center space-x-5">
        {Array.from({ length: numInputs }).map((_, index) => (
            <input
            key={index}
            ref={(el : any) => (inputsRef.current[index] = el) ||  undefined}
            type="text"
            maxLength={1}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="h-[48px] w-[46px] rounded border border-gray-300 text-center text-xl font-semibold focus:border-blue-500"
            pattern="\d*"
            inputMode="numeric"
            />
        ))}
      </div>
    </div>
  );
};

export default OtpField;
