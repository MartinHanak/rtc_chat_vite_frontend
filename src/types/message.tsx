import { userInfo } from "./user";


export type textMessage = {
    time: number;
    userInfo: userInfo;
    message: string;
};

export type fileMessage = {
    time: number;
    userInfo: userInfo;
    file: Blob;
};


export function isTextMessage(input: unknown): input is textMessage {
    return (
        typeof input === "object" &&
        input !== null &&
        "time" in input &&
        "userInfo" in input &&
        "message" in input &&
        typeof input.message === "string"
    );
}

export function isFileMessage(input: unknown): input is fileMessage {
    return (
        typeof input === "object" &&
        input !== null &&
        "time" in input &&
        "userInfo" in input &&
        "file" in input &&
        input.file instanceof Blob
    );
}