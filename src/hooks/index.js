import { AppContext } from "@/app/[lang]/app-provider";
import React, { useState } from "react";

export function useDictionary() {
  const { dictionary } = React.useContext(AppContext);
  if (dictionary === null) {
    throw new Error("useDictionary hook must be used within AppProvider");
  }

  return dictionary;
}

export function useUser() {
  const { username } = React.useContext(AppContext);
  if (username === null) {
    throw new Error("User isn't logined");
  }

  return username;
}

export const useLocalStorage = (key, initialValue) => {
  const [state, setState] = useState(() => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (error) {
      console.log(error);
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value;
      localStorage.setItem(key, JSON.stringify(valueToStore));
      setState(value);
    } catch (error) {
      console.log(error);
    }
  };

  return [state, setValue];
};
