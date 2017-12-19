"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_lib_1 = require("./common-lib");
const operators_1 = require("rxjs/operators");
const fromPromise_1 = require("rxjs/observable/fromPromise");
var http = require('http');
var lib = require('./lib.js');
/**Базовый сервис*/
class ServiceProvider {
    constructor() {
        this.host = 'http://localhost:3003/api/';
    }
    /**Получить сущность*/
    getEntity(identity, factory) {
        let entityEmpty = factory.createEmpty();
        let entityUrl = this.host + entityEmpty.entityName + '/' + identity;
        return fromPromise_1.fromPromise(lib.getHttp(entityUrl, null))
            .pipe(operators_1.map((data) => {
            return common_lib_1.CommonLib.extractData(data, entityEmpty);
        }))
            .pipe(operators_1.map((data) => {
            return data.Result.data[0];
        }))
            .pipe(operators_1.map(data => {
            let newEntity = factory.createEmpty();
            newEntity.fromRawObject(data);
            return newEntity;
        }))
            .pipe(operators_1.catchError(common_lib_1.CommonLib.handleError));
    }
    /**Получить сущность*/
    getEntityForField(fieldName, fieldValue, factory) {
        // null для REST
        if (!fieldValue) {
            fieldValue = 'null';
        }
        let entityEmpty = factory.createEmpty();
        let entityUrl = `${this.host}${entityEmpty.entityName}/${fieldName}/${fieldValue}`;
        return fromPromise_1.fromPromise(lib.getHttp(entityUrl, null))
            .pipe(operators_1.map((data) => {
            return common_lib_1.CommonLib.extractData(data, entityEmpty);
        }))
            .pipe(operators_1.pluck('Result'))
            .pipe(operators_1.pluck('data'))
            .pipe(operators_1.map((data) => {
            let result = [];
            for (let item of data) {
                let newEntity = factory.createEmpty();
                newEntity.fromRawObject(item);
                result.push(newEntity);
            }
            return result;
        }))
            .pipe(operators_1.catchError(common_lib_1.CommonLib.handleError));
    }
    /**Получить список для родительской сущности*/
    getEntityListForParent(parentName, identity, factory) {
        let entityEmpty = factory.createEmpty();
        let entityUrl = this.host + `${parentName}/${identity}/${entityEmpty.entityName}`;
        return fromPromise_1.fromPromise(lib.getHttp(entityUrl))
            .pipe(operators_1.map((data) => {
            return common_lib_1.CommonLib.extractData(data, entityEmpty);
        }))
            .pipe(operators_1.pluck('Result'))
            .pipe(operators_1.pluck('data'))
            .pipe(operators_1.map((data) => {
            let result = [];
            for (let item of data) {
                let newEntity = factory.createEmpty();
                newEntity.fromRawObject(item);
                result.push(newEntity);
            }
            return result;
        }))
            .pipe(operators_1.catchError(common_lib_1.CommonLib.handleError));
    }
    /**Получить номер документа*/
    getDocNum(docName) {
        let entityUrl = this.host + `getdocnum/${docName}`;
        return fromPromise_1.fromPromise(lib.getHttp(entityUrl))
            .pipe(operators_1.map((data) => {
            return data.Result.data[0];
        }))
            .pipe(operators_1.catchError(common_lib_1.CommonLib.handleError));
    }
}
exports.ServiceProvider = ServiceProvider;
