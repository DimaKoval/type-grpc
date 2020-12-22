import { GrpcServiceClass } from '../types/Meta';
import { ProtoSyntaxGenerate } from './Syntax/ProtoSyntaxGenerate';

export enum ProtoSyntax {
  /**
   * @deprecated
   */
  proto = 'proto',
  /**
   * @deprecated
   */
  proto2 = 'proto2',
  proto3 = 'proto3',
}
export type GenerateProtoOptions = {
  path?: string;
  syntax?: ProtoSyntax;
  package?: string;

  services: Array<GrpcServiceClass>,
}

export default async function (options: GenerateProtoOptions) {
  let instance;
  switch(options.syntax) {
    case ProtoSyntax.proto:
      instance = new ProtoSyntaxGenerate(options);
      break;
    case ProtoSyntax.proto2:
      instance = new ProtoSyntaxGenerate(options);
      break;
    default:
      instance = new ProtoSyntaxGenerate(options);
  }

  return await instance.run();
}
