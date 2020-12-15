import {
  Service,
  RPC,
  Input,
  Message,
  Field,
  Metadata,
} from '../';

@Message()
class ServiceMethodResponse {
  @Field()
  uuid: string;

  @Field()
  message: string;
}

@Message()
export class MethodInput {
  @Field()
  name: string;
}

@Service()
export class ServiceName {
  @RPC(type => ServiceMethodResponse, {})
  async methodName(
            @Metadata() metadata: any,
            @Input(type => MethodInput, { nullable: true }) input: MethodInput,
  ): Promise<ServiceMethodResponse> {
    return {
      uuid: 'f23fd-434dfs-4324fdsf-43432fd',
      message: `Hello ${input.name}`,
    };
  }
}
