import { getRPCMeta } from '../../meta';


export function Metadata<MetadataShape>(): ParameterDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: number) {
    const rpc = getRPCMeta(target.constructor, propertyKey);
    rpc.metadata = { descriptor };
  };
}
