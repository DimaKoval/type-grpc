import { getMeta, getRPCMeta } from '../../meta';
import { MessageTypeCallback } from '../../types/global';

export interface RPCOptions {
  // todo
}

export function RPC(type: MessageTypeCallback, options?: RPCOptions): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
    const rpc = getRPCMeta(target.constructor, propertyKey);

    rpc.reply = {
      type,
      options,
    };

    return descriptor;
  };
}
