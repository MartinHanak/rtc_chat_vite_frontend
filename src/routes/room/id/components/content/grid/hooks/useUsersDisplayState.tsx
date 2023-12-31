import { useEffect, useState } from "react";
import { useSocketContext } from "../../../context/SocketContext";
import { displayState, userDisplayState } from "../../../../../../../types/user";

export default function useUsersDisplayState() {
  const { users } = useSocketContext();
  const [usersDisplayState, setUsersDisplayState] = useState<Map<string, userDisplayState>>(new Map());

  useEffect(() => {
    setUsersDisplayState((previousState) => {
      const newState: Map<string, userDisplayState> = new Map();

      users.forEach((user) => {
        // remember previous display settings for old users
        const previousUserSettings = previousState.get(user.socketId);
        if (previousUserSettings) {
          newState.set(user.socketId, previousUserSettings);
        } else {
          newState.set(user.socketId, { ...user, displayState: "main" });
        }
      });

      return newState;
    });
  }, [users]);

  function changeUserDisplayState(userId: string, state: displayState) {

    setUsersDisplayState((prev) => {
      const newState = new Map<string, userDisplayState>();

      prev.forEach((value, key) => {
        newState.set(key, value);
      });

      const previousUserDisplayState = prev.get(userId);
      if (previousUserDisplayState) {
        newState.set(userId, { ...previousUserDisplayState, displayState: state });
      }

      return newState;
    });

  }


  return {
    usersDisplayState,
    changeUserDisplayState
  };
}
