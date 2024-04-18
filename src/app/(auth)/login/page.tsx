"use client";

import Card from "@/app/_components/Card";
import Promotional from "@/app/_components/Promotional";
import Button from "@/app/_ui/Button";
import InputField from "@/app/_ui/InputField";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useCookies } from 'react-cookie';


export type FormData = {
  email: string;
  password: string;
};

const page = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [cookies, setCookie] = useCookies(['authToken']);
  const router = useRouter();

  const loginMutation = api.auth.login.useMutation({
    onSuccess: () => {
      router.refresh();
      setFormData({
        email: '',
        password: '',
      })
    },
    onError: (error : any) => {
      // Handle error here, for example showing a notification to the user
      console.error("Login error:", error);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response : any = await loginMutation.mutateAsync({
        email : formData.email,
        password : formData.password
      })

      console.log("Login success:", response);

      setCookie('authToken', response?.token, { path: '/' });
      router.push("/")
    } catch (error) {
      console.error("Login error", error)
    }
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
