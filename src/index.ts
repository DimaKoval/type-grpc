import 'reflect-metadata';
export { default as generateProto } from './gen/gen';

export { Service } from './decorators/Service/Service';
export { RPC } from './decorators/Service/RPC';
export { Input } from './decorators/Service/Input';
export { Metadata } from './decorators/Service/Metadata';

export { Message } from './decorators/Message/Message';
export { Field } from './decorators/Message/Field';

export { RPCMeta } from './types/RPCMeta'
