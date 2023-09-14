import { createContext, useContext, useState } from "react";

interface LocalSettingsContextValue {
    username: string;
    changeUsername: (input: string) => void;
}

const LocalSettingsContext = createContext<LocalSettingsContextValue>({ username: '', changeUsername: () => { } });

// eslint-disable-next-line react-refresh/only-export-components
export const useLocalSettingsContext = () => useContext(LocalSettingsContext);

interface LocalSettingsContext {
    children: React.ReactNode;
}



export function LocalSettingsProvider({ children }: LocalSettingsContext) {

    const [username, setUsername] = useState(() => getStorageUsername());


    function getStorageUsername() {
        const storedUsername = localStorage.getItem('username');

        if (!storedUsername) {
            return "";
        } else {
            return storedUsername;
        }
    }

    function setAndStoreUsername(input: string) {
        localStorage.setItem('username', input);
        setUsername(input);
    }

    return (
        <LocalSettingsContext.Provider value={{ username, changeUsername: setAndStoreUsername }}>
            {children}
        </LocalSettingsContext.Provider>
    );
}
