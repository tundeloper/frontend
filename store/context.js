import React from "react";
import { createContext } from "react";

export const Context = createContext({
  //states
  name: "Babatunde",
  token: "",
  username: "tundeloper",
  wallet_Balance: "",
  email: "tundeloper@gmail.com",
  hashEmail: "",
  hashNumber: "",
  isAuthenticated: false,

  //functions
  authenticate: (token) => {},
  saveCredential: (payload) => {},
  logout: () => {},
});
