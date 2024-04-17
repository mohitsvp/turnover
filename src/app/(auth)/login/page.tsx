"use client";

import Card from "@/app/_components/Card";
import Promotional from "@/app/_components/Promotional";
import Button from "@/app/_ui/Button";
import InputField from "@/app/_ui/InputField";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export type FormData = {
  email: string;
  password: string;
};

const page = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    router.push("/")
  };

  return (
    <div>
      <div>
        <Promotional text="Get 10% off on business sign up" />
      </div>
      <div>
        <Card>
          <div>
            <h1 className="text-[32px] font-bold">Login</h1>
          </div>
          <div className="m-auto w-[80%] my-[40px]">
            <h2 className="text-[24px]">Welcome back to ECOMMERCE</h2>
            <p>The next gen business marketplace</p>
          </div>
          <div className="text-left">
            <form onSubmit={handleSubmit}>
              <InputField
                label="Email"
                placeholder="Enter your email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <InputField
              label="Password"
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button text="LOGIN" type="submit" />
            </form>
          </div>
          <div className="border my-8"></div>
          <div>
            <p><span className="text-[#333333]">Don’t have an Account? </span> SIGNUP</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default page;
