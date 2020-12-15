# type-grpc
type-grpc is typescript library to generate grpc service definitions 

# example
```typescript
import {
  Service,
  RPC,
  Input,
  Message,
  Field,
  Metadata,
  RPCMeta,
} from 'type-grpc';

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
            @Metadata() metadata: RPCMeta,
            @Input(type => MethodInput, { nullable: true }) input: MethodInput,
  ): Promise<ServiceMethodResponse> {
    return {
      uuid: 'f23fd-434dfs-4324fdsf-43432fd',
      message: `Hello ${input.name}`,
    };
  }
}
```

# warning
this package is under development, so it's not production ready. any contributions in any way is appreciated 

