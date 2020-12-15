import fs, { WriteStream } from 'fs';

import { GrpcServiceClass, TypeGrpcMeta } from '../../types/Meta';
import { getMeta } from '../../meta';
import { RPCMeta } from '../../types/RPCMeta';
import { GenerateProtoOptions, ProtoSyntax } from '../gen';

export class ProtoSyntaxGenerate {

  static tab = '  ';

  /**
   * Generate options
   */
  private options: GenerateProtoOptions;

  private file!: WriteStream;

  /**
   * constructor to combine default and passed options
   *
   * @param path
   * @param options
   */
  constructor(private path: string, options: GenerateProtoOptions) {
    this.options = {
      syntax: ProtoSyntax.proto3,
      ...options,
    };
  }


  writeHeader() {
    const { file, options } = this;
    file.write(`syntax = "${options.syntax}";\n\n`);
    file.write(`package "${options.package}";\n\n`);
  }

  buildServiceBrackets(meta: TypeGrpcMeta) {
    return [
      `service ${meta.serviceName} {\n`,
      '}\n\n',
    ];
  }

  writeRPCLine(rpc: RPCMeta) {
    const { tab } = ProtoSyntaxGenerate;

    const { file } = this;
    const ReplyType = rpc.reply ? rpc.reply.type(null) : null;
    file.write(`${tab}rpc ${rpc.name} (Empty) returns (${ReplyType ? ReplyType.name : 'Empty'});\n`);
  }

  writeService(Service: GrpcServiceClass) {
    const { file } = this;
    const meta = getMeta(Service);

    const [serviceStart, serviceEnd] = this.buildServiceBrackets(meta);
    file.write(serviceStart);

    for (const key in meta.rpc) {
      const rpc = meta.rpc[key];
      this.writeRPCLine(rpc);
    }

    file.write(serviceEnd);
  }

  async run() {
    const { path, options } = this;
    const file = this.file = fs.createWriteStream(path);

    this.writeHeader();
    options.services.forEach((Service: GrpcServiceClass) => {
      this.writeService(Service);
    });
  }
}
