import * as path from 'path';
import { Service, RPC, Message, Field, generateProto } from '../..';

@Message()
class ReplyMessage {
  @Field(type => Number)
  field: number;
}

@Service()
class ServiceGeneration {

  @RPC(reply => ReplyMessage)
  async method(ctx: any): Promise<ReplyMessage> {
    return { field: 1 };
  }

}

let proto: { path: string; buffer: Buffer; content: string; };
beforeAll(async () => {
  const protoPath = path.resolve(__dirname, 'service.proto');
  const buffer = await generateProto({ path: protoPath, services: [ServiceGeneration] });

  proto = {
    path: protoPath,
    buffer,
    content: buffer.toString(),
  };
});

test('uses proto3 syntax by default', () => {
  expect(proto.content).toContain('syntax = "proto3";');
})

test('has service definition', async () => {
  expect(proto.content).toContain(`service ${ServiceGeneration.name} {`);
});

test('has service with rpc definition', async () => {
  expect(proto.content).toContain(`service ServiceGeneration {
  rpc method (Empty) returns (ReplyMessage) {}
}`);
});

test('has reply message definition', () => {
  expect(proto.content).toContain(`message ReplyMessage {
  int32 field = 1;
}`);
});

// todo: stream reply/input tests
