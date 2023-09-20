import { useState } from "react";

export default function useLocalStorageUsername() {
  const [username, setUsername] = useState(() => getStorageUsername());

  function getStorageUsername() {
    const storedUsername = localStorage.getItem("username");

    if (!storedUsername) {
      return "";
    } else {
      return storedUsername;
    }
  }

  function changeUsername(input: string) {
    localStorage.setItem("username", input);
    setUsername(input);
  }

  return {
    username,
    changeUsername,
  };
}
