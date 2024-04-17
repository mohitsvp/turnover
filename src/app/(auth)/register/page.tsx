"use client"

import Card from "@/app/_components/Card";
import Form from "@/app/_components/Form";
import Promotional from "@/app/_components/Promotional";
import Button from "@/app/_ui/Button";
import InputField from "@/app/_ui/InputField";
import React, { useState } from "react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export type FormData = {
  name: string;
  email: string;
  password: string;
};


const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });
  
  const registerMutation = api.register.register.useMutation({
    onSuccess: () => {
      router.refresh();
      setFormData({
        name: '',
        email: '',
        password: '',
      })
    },
    onError: (error : any) => {
      // Handle error here, for example showing a notification to the user
      console.error("Registration error:", error);
    },
  });



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      registerMutation.mutate({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      router.push("/verification")
    } catch (error) {
      console.error("Error in registering the user")
    }
  };

  return (
    <div>
      <Promotional text="Get 10% off on business sign up" />
      <Card>
        <div>
          <h1 className="text-[32px] font-bold">Create Your Account</h1>
        </div>
        <div>
          <Form onSubmit={handleSubmit}>
            <InputField
              label="Name"
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <InputField
              label="Email"
              type="email"
              placeholder="Enter your email"
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
            <Button text="CREATE ACCOUNT" type="submit" />
          </Form>
        </div>
        <div>
          <p><span className="text-[#333333]">Have an account?</span> LOGIN</p>
        </div>
      </Card>
    </div>
  );
};

export default Register;
