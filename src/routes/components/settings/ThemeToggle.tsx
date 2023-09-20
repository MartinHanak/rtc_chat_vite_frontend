import { Button } from "@mui/material";
import { useLocalSettingsContext } from "../LocalSettingsContext";

export default function ThemeToggle() {
    const { toggleColorTheme } = useLocalSettingsContext();
    return (
        <Button onClick={toggleColorTheme}>Toggle</Button>
    );
}