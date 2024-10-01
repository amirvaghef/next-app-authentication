"use client";

import React from "react";
import { isAuthenticated, getAuthenticatedUser } from "@/authUtility";

export const AppContext = React.createContext();

export function AppProvider({ dictionary, children }) {
  return (
    <AppContext.Provider
      value={{
        dictionary,
        username: getAuthenticatedUser(),
        isAuthenticated: isAuthenticated(),
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
