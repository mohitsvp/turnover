"use client"

import Card from "@/app/_components/Card";
import Promotional from "@/app/_components/Promotional";
import Button from "@/app/_ui/Button";
import OtpField from "@/app/_ui/OtpField";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Verification = () => {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const email = "mohit.singhal@masaischool.com";

  const verifyOtp = api.verify.verifyOtp.useMutation({
    onSuccess: (data : {message : string}) => {
      console.log(data.message)
      router.push("/login")
    },
    onError: (error : any) => {
      console.log("ERROR ", error)
    }
  })
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    verifyOtp.mutate({email, otp})
  };

  return (
    <div>
      <Promotional text="Get 10% off on business sign up" />
      <Card>
        <div>
          <h1 className="text-[32px] font-bold">Verify your email</h1>
        </div>
        <div>
          <p className="m-auto w-[70%] my-[40px]">
            Enter the 8 digit code you have received on anu***@gmail.com
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <OtpField onChange={setOtp} />
            <div className="mt-4 text-center">
              <Button text="Verify" type="submit" />
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Verification;
