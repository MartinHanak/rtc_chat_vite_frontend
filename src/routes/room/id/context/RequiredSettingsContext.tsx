import { createContext, useContext } from "react";
import { useLocalSettingsContext } from "../../../components/LocalSettingsContext";
import { RequiredSettingsInput } from "./RequiredSettingsInput";


interface RequiredSettingsContextValue {
    username: string;
}

const RequiredSettingsContext = createContext<RequiredSettingsContextValue>({ username: '' });

export const useRequiredSettingsContext = () => useContext(RequiredSettingsContext);

interface RequiredSettingsContext {
    children: React.ReactNode;
}

export function RequiredSettingsProvider({ children }: RequiredSettingsContext) {

    const { username } = useLocalSettingsContext();

    return (
        <RequiredSettingsContext.Provider value={{ username }}>
            {
                username === "" ?
                    <RequiredSettingsInput />
                    :
                    children
            }
        </RequiredSettingsContext.Provider>
    );
}