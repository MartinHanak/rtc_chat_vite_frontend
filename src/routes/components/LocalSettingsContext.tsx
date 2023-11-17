import { Theme, createTheme } from "@mui/material";
import { createContext, useContext } from "react";
import useColorTheme from "../../hooks/useColorTheme";
import useUserColor from "../../hooks/useUserColor";
import useLocalStorage from "../../hooks/useLocalStorage";


interface LocalSettingsContextValue {
    username: string;
    changeUsername: (input: string) => void;
    displayRandomRoom: string;
    changeDisplayRandomRoom: (input: string, save?: boolean) => void;
    mode: 'light' | 'dark';
    toggleColorTheme: () => void;
    theme: Theme;
    userColor: string | undefined;
    changeUserColor: (color: string) => void;
}

const LocalSettingsContext = createContext<LocalSettingsContextValue>({ username: '', changeUsername: () => { }, displayRandomRoom: '', changeDisplayRandomRoom: () => { }, mode: 'dark', toggleColorTheme: () => { }, theme: createTheme(), userColor: '', changeUserColor: () => { } });

// eslint-disable-next-line react-refresh/only-export-components
export const useLocalSettingsContext = () => useContext(LocalSettingsContext);

interface LocalSettingsContext {
    children: React.ReactNode;
}

export function LocalSettingsProvider({ children }: LocalSettingsContext) {

    const { username, changeUsername, displayRandomRoom, changeDisplayRandomRoom } = useLocalStorage();

    const { theme, mode, toggleColorTheme } = useColorTheme();

    const { userColor, changeUserColor } = useUserColor();

    return (
        <LocalSettingsContext.Provider value={{ username, changeUsername, displayRandomRoom, changeDisplayRandomRoom, theme, mode, toggleColorTheme, userColor, changeUserColor }}>
            {children}
        </LocalSettingsContext.Provider>
    );
}
