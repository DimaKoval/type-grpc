import { GrpcServiceClass, TypeGrpcMeta } from './types/Meta';
import { RPCMeta } from './types/RPCMeta';

export function getRpcName(propertyKey: string | symbol): string {
  if (typeof propertyKey === 'symbol') {
    return propertyKey.toString();
  }
  return propertyKey;
}

/**
 * Get or initiate metadata on a target
 *
 * @param {GrpcServiceClass} target
 * @returns {TypeGrpcMeta}
 */
export function getMeta(target: GrpcServiceClass): TypeGrpcMeta {
  if (!target.__type_grpc_meta__) {
    target.__type_grpc_meta__ = {
      serviceName: target.name,
      rpc: {},
    };
  }
  return target.__type_grpc_meta__;
}

export function getRPCMeta(target: GrpcServiceClass, propKey: string | symbol): RPCMeta {
  const meta = getMeta(target);
  const rpcName = getRpcName(propKey);

  if (!meta.rpc[rpcName]) {
    meta.rpc[rpcName] = { name: rpcName };
  }

  return meta.rpc[rpcName];
}
