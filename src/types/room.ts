export type RoomType = "video" | "audio" | "text";

export interface Room {
  name: string;
  type: RoomType;
  createdAt: number;
}

export function isRoom(input: unknown): input is Room {
  return (
    typeof input === "object" &&
    input !== null &&
    "name" in input &&
    "type" in input &&
    "createdAt" in input &&
    typeof input.name === "string" &&
    typeof input.type === "string" &&
    (input.type === "video" ||
      input.type === "audio" ||
      input.type === "text") &&
    typeof input.createdAt === "number"
  );
}
