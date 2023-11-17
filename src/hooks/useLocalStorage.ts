import { useState } from "react";

export default function useLocalStorage() {
  const [username, setUsername] = useState(() => getStorageItem("username"));
  const [displayRandomRoom, setDisplayRandomRoom] = useState(() =>
    getStorageItem("displayRandomRoom")
  );

  function getStorageItem(key: string) {
    const storageItem = localStorage.getItem(key);

    if (!storageItem) {
      return "";
    } else {
      return storageItem;
    }
  }

  function changeStorageItem(
    itemKey: string,
    itemValue: string,
    saveToLocalStorage?: boolean
  ) {
    if (saveToLocalStorage) localStorage.setItem(itemKey, itemValue);

    switch (itemKey) {
      case "username":
        setUsername(itemValue);
        break;
      case "displayRandomRoom":
        setDisplayRandomRoom(itemValue);
        break;
    }
  }

  return {
    username,
    changeUsername: (value: string) => changeStorageItem("username", value),
    displayRandomRoom,
    changeDisplayRandomRoom: (value: string, save?: boolean) =>
      changeStorageItem("displayRandomRoom", value, save),
  };
}
