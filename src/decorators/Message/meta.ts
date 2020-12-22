const MESSAGE_METADATA_KEY = 'message_key';

export interface GRPCMessageMetadata {
  name: string;
  fields: { type: string, name: string, repeated: boolean, order: number }[];
}

export const getMessageMeta = (target: Function): GRPCMessageMetadata => {
  return Reflect.getMetadata(MESSAGE_METADATA_KEY, target) || {
    name: target.name,
    fields: [],
  };
};

export const setMessageMeta = (target: Function, obj: GRPCMessageMetadata) => {
  Reflect.metadata(MESSAGE_METADATA_KEY, obj)(target);
};
