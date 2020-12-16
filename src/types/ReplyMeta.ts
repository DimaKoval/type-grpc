import { MessageTypeCallback } from './global';

export type ReplyOptions = {
    stream?: boolean,
    nullable?: boolean;
}

export interface ReplyMeta {
    options?: ReplyOptions;
    type: MessageTypeCallback;
}
