export type Messages = {
    text: string
    title?: string | null
    codeType?: string
} | undefined;

export class ResponseError extends Error {
    code: number;
    messages: Messages[] | Messages;

    constructor(messages: Messages[] | Messages, code: number) {
        super();
        this.code = code;
        this.messages = messages;
    }
}