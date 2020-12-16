
export function Field(): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol) {
    // console.log('message field', target, propertyKey);
  };
}
