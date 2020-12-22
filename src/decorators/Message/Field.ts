import { getMessageMeta, setMessageMeta } from './meta';
import { ClassType } from '../../types/global';

function getType<Type, T = { new(): Type }>(typeFn: (type: any) => Type): {
  repeated: boolean;
  type: string | null;
} {
  const type = typeFn(void 0);
  const repeated = Array.isArray(type);

  switch(Array.isArray(type) ? type[0] : type) {
    case Number:
      return { type: 'int32', repeated };
    case Boolean:
      return { type: 'bool', repeated };
    case String:
      return { type: 'string', repeated };
    default:
      return { type: null, repeated };
  }
}

export interface FieldOptions {
  description?: string;
  order?: number;
}

export function Field(
  typeFn?: (type: any) => ClassType | Function | any,
  options?: FieldOptions
): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol) {
    const meta = getMessageMeta(target.constructor);
    // todo: get type from `type` attribute,
    // todo: if not provided -infer field type from typescript types metadata
    const { type, repeated } = typeFn
      ? getType(typeFn)
      : { type: 'string', repeated: false };

    meta.fields.push({
      name: typeof propertyKey === 'string' ? propertyKey : propertyKey.toString(),
      type: type!,
      repeated,
      order: meta.fields.length + 1,
    });

    setMessageMeta(target.constructor, meta);
  };
}
