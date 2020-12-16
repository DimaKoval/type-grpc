import { MessageTypeCallback } from './global';

export type InputOptions = {
    stream?: boolean,
    nullable?: boolean;
}

export interface InputMeta {
    descriptor: number;
    options?: InputOptions;
    type: MessageTypeCallback;
}
