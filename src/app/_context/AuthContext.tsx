"use client"

import React, { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { verifyToken } from "@/utils/auth";

export type User = {
  id: number;
  name: string;
  email: string;
};

type DecodedToken = {
  user: User;
};

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading : boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cookies] = useCookies(["authToken"]);

  useEffect(() => {
    const authToken = cookies.authToken as string;
    if (typeof authToken === 'string') {
      try {
        const decoded = verifyToken(authToken) as DecodedToken;
        if (decoded && 'user' in decoded) {
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
    setIsLoading(false);
  }, [cookies.authToken]);
  

  


  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
