import { getMeta, getRPCMeta } from '../../meta';
import { MessageTypeCallback } from '../../types/global';

export function RPC(type: MessageTypeCallback, options: any): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
    const rpc = getRPCMeta(target.constructor, propertyKey);

    rpc.reply = {
      type,
      options,
    };

    console.log('rpc meta', getMeta(target.constructor).rpc.methodName);
    return descriptor;
  };
}
