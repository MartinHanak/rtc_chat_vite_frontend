import { Theme, createTheme } from "@mui/material";
import { createContext, useContext } from "react";
import useLocalStorageUsername from "../../hooks/useLocalStorageUsername";
import useColorTheme from "../../hooks/useColorTheme";
import useUserColor from "../../hooks/useUserColor";

interface LocalSettingsContextValue {
    username: string;
    changeUsername: (input: string) => void;
    mode: 'light' | 'dark';
    toggleColorTheme: () => void;
    theme: Theme;
    userColor: string | undefined;
    changeUserColor: (color: string) => void;
}

const LocalSettingsContext = createContext<LocalSettingsContextValue>({ username: '', changeUsername: () => { }, mode: 'dark', toggleColorTheme: () => { }, theme: createTheme(), userColor: '', changeUserColor: () => { } });

// eslint-disable-next-line react-refresh/only-export-components
export const useLocalSettingsContext = () => useContext(LocalSettingsContext);

interface LocalSettingsContext {
    children: React.ReactNode;
}



export function LocalSettingsProvider({ children }: LocalSettingsContext) {

    const { username, changeUsername } = useLocalStorageUsername();

    const { theme, mode, toggleColorTheme } = useColorTheme();

    const { userColor, changeUserColor } = useUserColor();

    return (
        <LocalSettingsContext.Provider value={{ username, changeUsername, theme, mode, toggleColorTheme, userColor, changeUserColor }}>
            {children}
        </LocalSettingsContext.Provider>
    );
}
