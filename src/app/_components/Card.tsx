import React from "react";

const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className="border border-[#C1C1C1] w-[576px] rounded-2xl text-center m-auto my-[40px] flex flex-col p-[40px]">{children}</div>;
};

export default Card;
