"use client"

import React, { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { verifyToken } from "@/utils/auth";

export type User = {
  id: number;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [cookies] = useCookies(["authToken"]);

  useEffect(() => {
    if (cookies.authToken) {
      try {
        const decoded = verifyToken(cookies.authToken);
        if (typeof decoded === "object") {
          const decodedUser: User = {
            id: decoded.user.id,
            name: decoded.user.name,
            email: decoded.user.email,
          };
          setUser(decodedUser);
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, [cookies.authToken]);

console.log("USER ", user)


  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
