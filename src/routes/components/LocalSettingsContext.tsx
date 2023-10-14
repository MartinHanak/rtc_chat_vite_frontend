import { Theme, createTheme } from "@mui/material";
import { createContext, useContext } from "react";
import useLocalStorageUsername from "../../hooks/useLocalStorageUsername";
import useColorTheme from "../../hooks/useColorTheme";

interface LocalSettingsContextValue {
    username: string;
    changeUsername: (input: string) => void;
    mode: 'light' | 'dark';
    toggleColorTheme: () => void;
    theme: Theme;
}

const LocalSettingsContext = createContext<LocalSettingsContextValue>({ username: '', changeUsername: () => { }, mode: 'dark', toggleColorTheme: () => { }, theme: createTheme() });

// eslint-disable-next-line react-refresh/only-export-components
export const useLocalSettingsContext = () => useContext(LocalSettingsContext);

interface LocalSettingsContext {
    children: React.ReactNode;
}



export function LocalSettingsProvider({ children }: LocalSettingsContext) {

    const { username, changeUsername } = useLocalStorageUsername();

    const { theme, mode, toggleColorTheme } = useColorTheme();

    return (
        <LocalSettingsContext.Provider value={{ username, changeUsername, theme, mode, toggleColorTheme }}>
            {children}
        </LocalSettingsContext.Provider>
    );
}
