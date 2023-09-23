import { useEffect, useState } from "react";
import { useSocketContext } from "../../../context/SocketContext";
import { userDisplayState } from "../../../../../../types/user";

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



  return {
    usersDisplayState
  };
}
