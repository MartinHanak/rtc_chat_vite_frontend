import LocalStream from "./content/LocalStream";
import PeerStreams from "./content/PeerStreams";
import { TextChat } from "./content/TextChat";

export default function RoomContent() {
    return (
        <>
            Room content here !
            <TextChat />

            <LocalStream />

            <PeerStreams />
        </>
    );
}