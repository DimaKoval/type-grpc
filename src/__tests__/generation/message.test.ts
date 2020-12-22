import path from "path";
import { Service, RPC, Input, Message, Field, generateProto } from '../..';

@Message()
class UserRequest {
  @Field()
  token: string;

  @Field(type => [String])
  permissions: Array<string>;
}

@Message()
class UserReply {
  @Field(type => Number)
  user_id: number;

  @Field()
  name: string;

  @Field(type => Boolean)
  is_authenticated: boolean;

  @Field(type => [String])
  permissions: Array<string>;
}

@Service()
class UserService {
  @RPC(type => UserReply)
  async getUser(@Input(type => UserRequest) { token, permissions }: UserRequest): Promise<UserReply> {
    if (token.indexOf('valid') !== -1) {
      return {
        is_authenticated: true,
        user_id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
        name: 'Jane Doe',
        permissions,
      };
    }
    return {
      is_authenticated: false,
      user_id: -1,
      name: '',
      permissions: [],
    }
  }
}

let proto: { path: string; buffer: Buffer; content: string; };
beforeAll(async () => {
  const protoPath = path.resolve(__dirname, 'message.proto');
  const buffer = await generateProto({ path: protoPath, services: [UserService] });

  proto = {
    path: protoPath,
    buffer,
    content: buffer.toString(),
  };
});

test('UserService#UserReply message', () => {
  expect(proto.content).toContain(`message UserReply {
  int32 user_id = 1;
  string name = 2;
  bool is_authenticated = 3;
  repeated string permissions = 4;
}`);
})