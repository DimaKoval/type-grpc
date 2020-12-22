# type-grpc
type-grpc is typescript library to generate grpc service definitions 

## installation

```
npm install type-grpc
```
OR
```
yarn add type-grpc
```

# Usage
#### service type definitions for 
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
#### mali grpc server with type-grpc
```typescript
import Mali from 'mali';

import { generateProto } from 'type-grpc';
import { ServiceName } from './ServiceName';

(async () => {
  const path = `${__dirname}/service.proto`;
  const packageName = 'PackageName';
  const services = [ServiceName];

  await generateProto(path, {
    package: packageName,
    services,
  });

  const app = new Mali(path);
  services.forEach((ServiceClass) => {
    const serviceMethods = new ServiceClass();
    console.log({ ...serviceMethods });
    app.use({
      methodName: serviceMethods.methodName,
      methodNameWithEmptyInput: serviceMethods.methodNameWithEmptyInput,
    }, packageName);
  })
  app.start('127.0.0.1:50051');
})();
```


# ⚠ warning ⚠
this package is under development, so it's not production ready. any contributions in any way is appreciated 

