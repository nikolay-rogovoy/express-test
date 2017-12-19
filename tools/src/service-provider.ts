import {IEntity} from './i-entity';
import {Observable} from 'rxjs/Observable';
import {CommonLib} from './common-lib';
import {Factory} from './factory';
import {catchError, map, pluck} from 'rxjs/operators';
import {fromPromise} from "rxjs/observable/fromPromise";
var http = require('http');
var lib = require('./lib.js');

/**Базовый сервис*/
export class ServiceProvider {

    host = 'http://localhost:3003/api/';

    constructor() {
    }

    /**Получить сущность*/
    getEntity(identity: number, factory: Factory): Observable<IEntity> {
        let entityEmpty = factory.createEmpty();
        let entityUrl = this.host + entityEmpty.entityName + '/' + identity;

        return fromPromise(lib.getHttp(entityUrl, null))
            .pipe(map((data: any) => {
                return CommonLib.extractData(data, entityEmpty);
            }))
            .pipe(map((data: any) => {
                return data.Result.data[0];
            }))
            .pipe(map(data => {
                let newEntity: IEntity = factory.createEmpty();
                newEntity.fromRawObject(data);
                return newEntity;
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

