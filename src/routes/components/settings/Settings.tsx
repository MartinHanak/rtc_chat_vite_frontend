import SettingsHeader from "./SettingsHeader";
import UserColorSettings from "./UserColorSettings";
import UsernameSettings from "./UsernameSettings";

interface Settings {
    closeModal: () => void;
}

export default function Settings({ closeModal }: Settings) {

    return (
        <>
            <SettingsHeader closeModal={closeModal} />
            <UsernameSettings />

            <UserColorSettings />
        </>
    );
}