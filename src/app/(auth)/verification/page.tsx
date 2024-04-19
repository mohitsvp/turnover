"use client";

import Card from "@/app/_components/Card";
import Promotional from "@/app/_components/Promotional";
import Button from "@/app/_ui/Button";
import OtpField from "@/app/_ui/OtpField";
import Spinner from "@/app/_ui/Spinner";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const Verification = () => {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["authToken"]);
  const [email, setEmail] = useState<string | null>("");


  useEffect(() => {
    if (typeof window !== "undefined") {
      let emailFromStorage = window.localStorage.getItem("email");
      if (typeof emailFromStorage === 'string') {
        // Remove extra quotes
        emailFromStorage = emailFromStorage.replace(/"/g, '');
      }
      setEmail(emailFromStorage ?? null);
    }
  }, []);

  const verifyOtp = api.verify.verifyOtp.useMutation({
    onSuccess: (data: { message: string; token: string }) => {
      setCookie("authToken", data?.token, { path: "/" });
      localStorage.removeItem("email");
      router.push("/");
    },
    onError: (error) => {
      alert(`Error occurred while verifying the OTP: ${error.message}`)
      console.error("ERROR ", error);
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    verifyOtp.mutate({ email : email ?? "", otp });
  };

  if (verifyOtp.status === 'pending') {
    return <Spinner/>;
  }

  return (
    <div>
      <Promotional text="Get 10% off on business sign up" />
      <Card>
        <div>
          <h1 className="text-[32px] font-bold">Verify your email</h1>
        </div>
        <div>
          <p className="m-auto my-[40px] w-[70%]">
            Enter the 8 digit code you have received on {email}
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
