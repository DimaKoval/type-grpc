import fs, { WriteStream } from 'fs';

import { GrpcServiceClass, TypeGrpcMeta } from '../../types/Meta';
import { getMeta } from '../../meta';
import { RPCMeta } from '../../types/RPCMeta';
import { GenerateProtoOptions, ProtoSyntax } from '../gen';
import { ClassType } from '../../types/global';
import { getMessageMeta } from '../../decorators/Message/meta';
import { Empty } from './preDefinedMessages/Empty';

export const TAB = '  ';

// TODO: replace service generation and message generation in it's own classes
// TODO: implement message repeated
// TODO: implement nested messages
// TODO: figure out metadata architecture

export class ProtoSyntaxGenerate {
  /**
   * Generate options
   */
  private options: GenerateProtoOptions;

  private file?: WriteStream;

  private lines: Array<string> = [];

  private line(str: string) {
    this.lines.push(str);
  }

  /**
   * constructor to combine default and passed options
   *
   * @param options
   */
  constructor(options: GenerateProtoOptions) {
    this.options = {
      syntax: ProtoSyntax.proto3,
      ...options,
    };
  }

  writeHeader() {
    const { options } = this;
    this.line(`syntax = "${options.syntax}";\n`);
    options.package && this.line(`package ${options.package};\n`);
  }

  buildServiceBrackets(meta: TypeGrpcMeta) {
    return [
      `service ${meta.serviceName} {`,
      '}\n',
    ];
  }

  writeRPCLine(rpc: RPCMeta) {
    const { file } = this;
    const InputType = rpc.input ? rpc.input.type(null) : null;
    const ReplyType = rpc.reply ? rpc.reply.type(null) : null;
    this.line(`${TAB}rpc ${rpc.name} (${
      InputType ? InputType.name : 'Empty'
    }) returns (${
      ReplyType ? ReplyType.name : 'Empty'
    }) {}`);
  }

  writeService(Service: GrpcServiceClass) {
    const meta = getMeta(Service);

    const [serviceStart, serviceEnd] = this.buildServiceBrackets(meta);
    this.line(serviceStart);

    for (const key in meta.rpc) {
      const rpc = meta.rpc[key];
      this.writeRPCLine(rpc);
    }
    this.line(serviceEnd);
  }

  writeMessages(Service: GrpcServiceClass) {
    const meta = getMeta(Service);

    const types = Object.keys(meta.rpc).reduce((acc, key) => {
      acc.push(meta.rpc[key].input?.type(null) ?? Empty);
      acc.push(meta.rpc[key].reply?.type(null) ?? Empty);
      return acc;
    }, [] as ClassType[]);

    const typeDefinitionsGenerated = new Map();
    types.forEach((Type) => {
      const msgMeta = getMessageMeta(Type);
      if (typeDefinitionsGenerated.has(msgMeta.name)) {
        return;
      }
      typeDefinitionsGenerated.set(msgMeta.name, 1);

      this.line(`message ${msgMeta.name} {`);
      msgMeta.fields.forEach((f) => {
        this.line(`${TAB}${f.repeated ? 'repeated ': ''}${f.type} ${f.name} = ${f.order};`);
      });
      this.line(`}\n`);
    })
  }

  async run(): Promise<Buffer> {
    const { options } = this;

    this.writeHeader();
    options.services.forEach((Service: GrpcServiceClass) => {
      this.writeService(Service);
    });
    options.services.forEach((Service: GrpcServiceClass) => {
      this.writeMessages(Service);
    });

    const { path } = options;
    const fileContent = this.lines.join('\n');
    const buffer = Buffer.from(fileContent);
    if (path) {
      this.file = fs.createWriteStream(path);
      await (new Promise((resolve, reject) => {
        this.file!.on('finish', resolve);
        this.file!.on('error', reject);
        this.file!.end(buffer, 'utf8');
      }))
    }

    return buffer;
  }
}
