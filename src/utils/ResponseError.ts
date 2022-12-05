export type Messages = {[key: string]: string | number} | undefined;

export class ResponseError extends Error {
    code: number;
    messages: Messages[] | Messages;

    constructor(messages: Messages[] | Messages, code: number) {
        super();
        this.code = code;
        this.messages = messages;
    }
}