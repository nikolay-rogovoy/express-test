import {IEntity} from './i-entity';
import {Observable} from 'rxjs/Observable';
import {CommonLib} from './common-lib';
import {Factory} from './factory';
import {catchError, map, mapTo, pluck} from 'rxjs/operators';
import {fromPromise} from "rxjs/observable/fromPromise";
var lib = require('./lib.js');
var logger = require("../logger.js");

/**Базовый сервис*/
export class ServiceProvider {

    host = 'http://localhost:3003/api/';

    constructor() {
    }

    /**Удалить сущность*/
    deleteEntity(entity: IEntity): Observable<boolean> {
        let entityUrl = this.host + entity.entityName;
        return fromPromise(lib.deleteHttp(entityUrl + '/' + entity[entity.keyName]))
            .pipe(
                map((data) => {
                    return CommonLib.extractData(data, entity);
                }),
                mapTo(true))
            .pipe(catchError(CommonLib.handleError));
    }

    /**Сохранить сущность*/
    postEntity(entity: IEntity): Observable<number> {
        let entityUrl = this.host + entity.entityName;
        let saveData = {
            data: [entity]
        };
        // TODO
        // console.log(saveData);
        return fromPromise(lib.postHttp(entityUrl, JSON.stringify(saveData)))
            .pipe(map((result: any) => {
                if (result.result && result.result.length && result.result.length === 1) {
                    return result.result[0].key_value;
                } else {
                    console.error('Ошибка метода postEntity, неправильный ответ сервера:');
                    console.error(result);
                    throw new Error(`Ошибка метода postEntity, не правильный ответ сервера: ${result}`);
                }
            }));
    }


    /**Получить сущность*/
    getEntity(identity: number, factory: Factory): Observable<IEntity> {
        let entityEmpty = factory.createEmpty();
        let entityUrl = this.host + entityEmpty.entityName + '/' + identity;

        return fromPromise(lib.getHttp(entityUrl, null))
            .pipe(
                map((data: any) => {
                    return CommonLib.extractData(data, entityEmpty);
                }),
                map((data: any) => {
                    return data.Result.data[0];
                }),
                map(data => {
                    let newEntity: IEntity = factory.createEmpty();
                    newEntity.fromRawObject(data);
                    return newEntity;
                })//,
                //catchError(CommonLib.handleError)
            );
    }

    /**Получить сущность*/
    getEntityForFieldRange(fieldName: string, fieldValueMin: string, fieldValueMax: string, factory: Factory): Observable<IEntity[]> {

        // null для REST
        if (!fieldValueMin) {
            fieldValueMin = 'null';
        }
        if (!fieldValueMax) {
            fieldValueMax = 'null';
        }

        let entityEmpty = factory.createEmpty();
        let entityUrl = `${this.host}${entityEmpty.entityName}/${fieldName}/${fieldValueMin}/${fieldValueMax}`;

        return fromPromise(lib.getHttp(entityUrl, null))
            .pipe(map((data) => {
                return CommonLib.extractData(data, entityEmpty);
            }))
            .pipe(pluck('Result'))
            .pipe(pluck('data'))
            .pipe(map((data: Array<any>) => {
                let result = [];
                for (let item of data) {
                    let newEntity: IEntity = factory.createEmpty();
                    newEntity.fromRawObject(item);
                    result.push(newEntity);
                }
                return result;
            }))
            .pipe(catchError(CommonLib.handleError));
    }

    /**Получить сущность*/
    getEntityForField(fieldName: string, fieldValue: string, factory: Factory): Observable<IEntity[]> {

        // null для REST
        if (!fieldValue) {
            fieldValue = 'null';
        }

        let entityEmpty = factory.createEmpty();
        let entityUrl = `${this.host}${entityEmpty.entityName}/${fieldName}/${fieldValue}`;

        return fromPromise(lib.getHttp(entityUrl, null))
            .pipe(map((data) => {
                return CommonLib.extractData(data, entityEmpty);
            }))
            .pipe(pluck('Result'))
            .pipe(pluck('data'))
            .pipe(map((data: Array<any>) => {
                let result = [];
                for (let item of data) {
                    let newEntity: IEntity = factory.createEmpty();
                    newEntity.fromRawObject(item);
                    result.push(newEntity);
                }
                return result;
            }))
            .pipe(catchError(CommonLib.handleError));
    }


    /**Получить список для родительской сущности*/
    getEntityListForParent(parentName: string, identity: number, factory: Factory): Observable<IEntity[]> {
        let entityEmpty = factory.createEmpty();

        let entityUrl = this.host + `${parentName}/${identity}/${entityEmpty.entityName}`;
        return fromPromise(lib.getHttp(entityUrl))
            .pipe(map((data) => {
                return CommonLib.extractData(data, entityEmpty);
            }))
            .pipe(pluck('Result'))
            .pipe(pluck('data'))
            .pipe(map((data: Array<any>) => {
                let result = [];
                for (let item of data) {
                    let newEntity: IEntity = factory.createEmpty();
                    newEntity.fromRawObject(item);
                    result.push(newEntity);
                }
                return result;
            }))
            .pipe(catchError(CommonLib.handleError));
    }

    /**Получить номер документа*/
    getDocNum(docName: string): Observable<string> {
        let entityUrl = this.host + `getdocnum/${docName}`;
        return fromPromise(lib.getHttp(entityUrl))
            .pipe(map((data: any) => {
                return data.Result.data[0];
            }))
            .pipe(catchError(CommonLib.handleError));
    }


}

