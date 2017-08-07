"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**Декоратор с параметром - может менять прототип класса*/
function PluginDecorator(name) {
    return function (ctor) {
        console.log("PluginDecorator: param = " + name);
        ctor.prototype.foo = function (i) {
            return i * i * i;
        };
    };
}
exports.PluginDecorator = PluginDecorator;
/**Декоратор с параметром конструктора - может менять конструктор*/
function ClassDecorator(constructor) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this.newProperty = "new property";
            _this.hello = "override";
            console.log("constructor = ClassDecorator");
            return _this;
        }
        return class_1;
    }(constructor));
}
exports.ClassDecorator = ClassDecorator;
/**Функция декоратор - оборачивает вызов функции оригинал*/
function FunctionDecorator(param) {
    return function (target, propertyKey, descriptor) {
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
        }
        var originalMethod = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
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
    var metadataKey = "__log_" + key + "_parameters";
    if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push(index);
    }
    else {
        target[metadataKey] = [index];
    }
    console.log('LogParameter: metadataKey = ' + metadataKey);
}
exports.LogParameter = LogParameter;
