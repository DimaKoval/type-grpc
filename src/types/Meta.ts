import { ClassType } from './global';
import { RPCMeta } from './RPCMeta';

export interface TypeGrpcMeta {
    serviceName: string;

    rpc: {
        [key: string]: RPCMeta;
    };
}


export interface GrpcServiceClass extends ClassType {
    __type_grpc_meta__?: TypeGrpcMeta;
}
