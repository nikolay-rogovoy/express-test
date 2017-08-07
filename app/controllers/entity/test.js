"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var d1_1 = require("./d1");
/**
 * Created by Николай on 28.06.2017.
 */
//import {} from './d1';
//  require(Test)
// @PluginDecorator('param')
var Test = (function () {
    function Test(m) {
        this.property = "property";
        this.hello = m;
        console.log("Test constructor this.hello = " + this.hello);
    }
    Test.prototype.foo = function (i) {
        console.log("foo() i = " + i);
        return i * i;
        //return i * i;
    };
    __decorate([
        d1_1.FunctionDecorator('for foo'),
        __param(0, d1_1.LogParameter),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Number)
    ], Test.prototype, "foo", null);
    Test = __decorate([
        d1_1.ClassDecorator,
        __metadata("design:paramtypes", [String])
    ], Test);
    return Test;
}());
exports.Test = Test;
