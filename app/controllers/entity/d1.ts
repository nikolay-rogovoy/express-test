
/**Декоратор с параметром - может менять прототип класса*/
export function PluginDecorator(name: string) {
  return (ctor: Function) => {
    console.log("PluginDecorator: param = " + name);

    ctor.prototype.foo = function (i : number) {
      return i * i * i;
    };
  };
}

/**Декоратор с параметром конструктора - может менять конструктор*/
export function ClassDecorator<T extends { new(...args: any[]): {} } > (constructor : T) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      console.log("constructor = ClassDecorator");
    }
    newProperty = "new property";
    hello = "override";
  }
}

/**Функция декоратор - оборачивает вызов функции оригинал*/
export function FunctionDecorator(param: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

    if(descriptor === undefined) {
      descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
    }
    let originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.log(param);
      console.log(args);
      var result = originalMethod.apply(this, args);
      return result;
    };

    // return edited descriptor as opposed to overwriting the descriptor
    return descriptor;
  };
}

/**Декоратор параметра - изменить методанные класса*/
export function LogParameter(target: any, key : string, index : number) {
  var metadataKey = `__log_${key}_parameters`;
  if (Array.isArray(target[metadataKey])) {
    target[metadataKey].push(index);
  }
  else {
    target[metadataKey] = [index];
  }
  console.log('LogParameter: metadataKey = ' + metadataKey);
}
