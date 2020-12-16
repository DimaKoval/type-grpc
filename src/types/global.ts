export interface ClassType {
    new (...args: any[]): any;
}

export type MessageTypeCallback = (type: any) => ClassType;
