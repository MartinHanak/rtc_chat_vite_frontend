import { useEffect, useState } from "react";
import useReadyStreams from "./useReadyStreams";
import useUsersDisplayState from "./useUsersDisplayState";
import { combinedUserState } from "../../../../../../types/user";

export default function useCombinedDisplayStreamState() {
    const { streams } = useReadyStreams();
    const { usersDisplayState } = useUsersDisplayState();

    const [combinedStreamDisplayState, setCombinedStreamDisplayState] = useState<Map<string, combinedUserState>>(new Map());

    useEffect(() => {
        const newState: Map<string, combinedUserState> = new Map();

        streams.forEach((stream, id) => {
            const userDisplayInfo = usersDisplayState.get(id);
            if (userDisplayInfo) {
                newState.set(id, { ...userDisplayInfo, stream });
            } else {
                console.log(`No user found for the stream with the id ${id}.`);
            }
        });

        setCombinedStreamDisplayState(newState);

    }, [streams, usersDisplayState]);

    return {
        streams: combinedStreamDisplayState
    };
}