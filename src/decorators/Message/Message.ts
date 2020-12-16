
export type GRPCMessageOptions = {
  package?: string;
}

/**
 * TOOD
 * @param options
 * @constructor
 */
export function Message(options?: GRPCMessageOptions): ClassDecorator {
  return function (target: Object): Object {
    // console.log('message target', target, options);
    return target;
  } as ClassDecorator;
}
