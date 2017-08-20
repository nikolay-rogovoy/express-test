"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**Декоратор с параметром - может менять прототип класса*/
function PluginDecorator(name) {
    return (ctor) => {
        console.log("PluginDecorator: param = " + name);
        ctor.prototype.foo = function (i) {
            return i * i * i;
        };
    };
}
exports.PluginDecorator = PluginDecorator;
/**Декоратор с параметром конструктора - может менять конструктор*/
function ClassDecorator(constructor) {
    return class extends constructor {
        constructor(...args) {
            super(...args);
            this.newProperty = "new property";
            this.hello = "override";
            console.log("constructor = ClassDecorator");
        }
    };
}
exports.ClassDecorator = ClassDecorator;
/**Функция декоратор - оборачивает вызов функции оригинал*/
function FunctionDecorator(param) {
    return function (target, propertyKey, descriptor) {
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
        }
        let originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            console.log(param);
            console.log(args);
            var result = originalMethod.apply(this, args);
            return result;
        };
        // return edited descriptor as opposed to overwriting the descriptor
        return descriptor;
    };
}
exports.FunctionDecorator = FunctionDecorator;
/**Декоратор параметра - изменить методанные класса*/
function LogParameter(target, key, index) {
    var metadataKey = `__log_${key}_parameters`;
    if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push(index);
    }
    else {
        target[metadataKey] = [index];
    }
    console.log('LogParameter: metadataKey = ' + metadataKey);
}
exports.LogParameter = LogParameter;
