import { getMeta } from '../../meta';


export type GRPCServiceOptions = {
  name?: string;
}

/**
 * TODO documentation
 * @param options
 * @constructor
 */
export function Service(options?: GRPCServiceOptions): ClassDecorator {
  return <GrpcServiceClass>(target: GrpcServiceClass): GrpcServiceClass => {
    const meta = getMeta(target as any);
    if (options && options.name) {
      meta.serviceName = options.name;
    }
    return target;
  };
}
