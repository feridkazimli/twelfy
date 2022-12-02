export type Messages = {[key: string]: string} | undefined;

export class ResponseError extends Error {
    code: number;
    messages: Messages[];

    constructor(messages: Messages[], code: number) {
        super();
        this.code = code;
        this.messages = messages;
    }
}