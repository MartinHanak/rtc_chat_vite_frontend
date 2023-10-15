export interface userInfo {
  socketId: string;
  username: string;
  color: string;
}

export interface userInfoWithColor extends userInfo {
  color: string;
}

export type displayState = "main" | "side" | "unselected";

export interface userDisplayState extends userInfo {
  displayState: displayState;
}
export interface combinedUserState extends userDisplayState {
  stream: MediaStream;
}
