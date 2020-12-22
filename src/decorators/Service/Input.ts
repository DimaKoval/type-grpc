import { getRPCMeta } from '../../meta';
import { ClassType } from '../../types/global';
import { InputOptions } from '../../types/InputMeta';

export function Input(type: (type: any) => ClassType, options?: InputOptions): ParameterDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: number) {
    const rpc = getRPCMeta(target.constructor, propertyKey);

    rpc.input = {
      descriptor,
      type,
      options,
    };
  };
}
