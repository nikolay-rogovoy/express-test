"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_lib_1 = require("./common-lib");
const operators_1 = require("rxjs/operators");
const fromPromise_1 = require("rxjs/observable/fromPromise");
var lib = require('./lib.js');
var logger = require("../logger.js");
/**Базовый сервис*/
class ServiceProvider {
    constructor() {
        this.host = 'http://localhost:3003/api/';
    }
    /**Удалить сущность*/
    deleteEntity(entity) {
        let entityUrl = this.host + entity.entityName;
        return fromPromise_1.fromPromise(lib.deleteHttp(entityUrl + '/' + entity[entity.keyName]))
            .pipe(operators_1.map((data) => {
            return common_lib_1.CommonLib.extractData(data, entity);
        }), operators_1.mapTo(true))
            .pipe(operators_1.catchError(common_lib_1.CommonLib.handleError));
    }
    /**Сохранить сущность*/
    postEntity(entity) {
        let entityUrl = this.host + entity.entityName;
        let saveData = {
            data: [entity]
        };
        // TODO
        // console.log(saveData);
        return fromPromise_1.fromPromise(lib.postHttp(entityUrl, JSON.stringify(saveData)))
            .pipe(operators_1.map((result) => {
            if (result.result && result.result.length && result.result.length === 1) {
                return result.result[0].key_value;
            }
            else {
                console.error('Ошибка метода postEntity, неправильный ответ сервера:');
                console.error(result);
                throw new Error(`Ошибка метода postEntity, не правильный ответ сервера: ${result}`);
            }
        }));
    }
    /**Получить сущность*/
    getEntity(identity, factory) {
        let entityEmpty = factory.createEmpty();
        let entityUrl = this.host + entityEmpty.entityName + '/' + identity;
        return fromPromise_1.fromPromise(lib.getHttp(entityUrl, null))
            .pipe(operators_1.map((data) => {
            return common_lib_1.CommonLib.extractData(data, entityEmpty);
        }), operators_1.map((data) => {
            return data.Result.data[0];
        }), operators_1.map(data => {
            let newEntity = factory.createEmpty();
            newEntity.fromRawObject(data);
            return newEntity;
        }) //,
        //catchError(CommonLib.handleError)
        );
    }
    /**Получить сущность*/
    getEntityForFieldRange(fieldName, fieldValueMin, fieldValueMax, factory) {
        // null для REST
        if (!fieldValueMin) {
            fieldValueMin = 'null';
        }
        if (!fieldValueMax) {
            fieldValueMax = 'null';
        }
        let entityEmpty = factory.createEmpty();
        let entityUrl = `${this.host}${entityEmpty.entityName}/${fieldName}/${fieldValueMin}/${fieldValueMax}`;
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
