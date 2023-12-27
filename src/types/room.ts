export type RoomType = "video" | "audio" | "text";

export const roomTypes: RoomType[] = ["video", "audio", "text"];

export interface Room {
  name: string;
  type: RoomType;
  country: string;
  language: string;
  description: string;
  createdAt: number;
  tags: string[];
  privateRoom: boolean;
}

export function isRoom(input: unknown): input is Room {
  return (
    typeof input === "object" &&
    input !== null &&
    "name" in input &&
    "type" in input &&
    "description" in input &&
    "createdAt" in input &&
    "privateRoom" in input &&
    typeof input.name === "string" &&
    typeof input.description === "string" &&
    typeof input.type === "string" &&
    typeof input.privateRoom === "boolean" &&
    (input.type === "video" ||
      input.type === "audio" ||
      input.type === "text") &&
    typeof input.createdAt === "number"
  );
}
