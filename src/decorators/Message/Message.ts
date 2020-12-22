import { getMessageMeta, setMessageMeta } from './meta';
import { ClassType } from '../../types/global';

export type GRPCMessageOptions = {
  package?: string;
}

/**
 * @param options
 * @constructor
 */
export function Message(options?: GRPCMessageOptions): ClassDecorator {
  return function (target: ClassType) {
    setMessageMeta(
      target.constructor,
      getMessageMeta(target.constructor),
    );
  } as ClassDecorator;
}
