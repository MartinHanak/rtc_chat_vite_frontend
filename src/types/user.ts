export interface userInfo {
  socketId: string;
  username: string;
}
export type displayState = "main" | "side" | "unselected";

export interface userDisplayState extends userInfo {
  displayState: displayState;
}
export interface combinedUserState extends userDisplayState {
  stream: MediaStream;
}