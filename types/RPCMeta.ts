import { InputMeta } from './InputMeta';
import { ReplyMeta } from './ReplyMeta';

export interface RPCMeta {
    name: string;

    /**
     * input type
     */
    input?: InputMeta;

    /**
     * reply type
     */
    reply?: ReplyMeta;

    /**
     *
     */
    metadata?: any;
    // middleware: Type[];
}
