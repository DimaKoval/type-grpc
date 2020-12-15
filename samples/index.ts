import { ServiceName } from './ClassSample';
import { generateProto } from '..';
import { ProtoSyntax } from '../gen/gen';

(async () => {
  await generateProto('./ClassSample.proto', {
    syntax: ProtoSyntax.proto3,
    package: 'package',
    services: [
      ServiceName,
    ],
  });
})();
