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
  syntax?: ProtoSyntax,
  package: string;
  services: Array<GrpcServiceClass>,
}

export default async function (path: string, options: GenerateProtoOptions) {
  let instance;
  switch(options.syntax) {
    case ProtoSyntax.proto:
      instance = new ProtoSyntaxGenerate(path, options);
      break;
    case ProtoSyntax.proto2:
      instance = new ProtoSyntaxGenerate(path, options);
      break;
    default:
      instance = new ProtoSyntaxGenerate(path, options);
  }

  await instance.run();

  return new Promise((resolve) => resolve());
}
