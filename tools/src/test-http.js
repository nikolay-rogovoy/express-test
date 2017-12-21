"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_provider_1 = require("./service-provider");
const sizedoc_1 = require("./sizedoc/entity/sizedoc");
const operators_1 = require("rxjs/operators");
const sizedocstagevalue_1 = require("./sizedoc/entity/sizedocstagevalue");
var lib = require('./lib.js');
var logger = require("../logger.js");
/**Базовый сервис*/
class TestHttp {
    constructor() {
    }
    testGetPeriod() {
        const currDate = new Date();
        const dates = [
            new Date(currDate.getUTCFullYear(), currDate.getUTCMonth(), currDate.getUTCDate()),
            new Date(currDate.getUTCFullYear(), currDate.getUTCMonth(), currDate.getUTCDate() + 1),
            new Date(currDate.getUTCFullYear(), currDate.getUTCMonth(), currDate.getUTCDate() + 2)
        ];
        const serviceProvider = new service_provider_1.ServiceProvider();
        let dtMin = dates[0];
        let dtMax = dates[dates.length - 1];
        let dtMax1 = new Date(dtMax);
        dtMax1.setTime(dtMax.getTime() + 1 * 86400000);
        serviceProvider.getEntityForFieldRange('plandate', `${dtMin.getFullYear()}${dtMin.getMonth() + 1}${dtMin.getDate()}`, `${dtMax1.getFullYear()}${dtMax1.getMonth() + 1}${dtMax1.getDate()}`, new sizedocstagevalue_1.SizedocstagevalueFactory())
            .subscribe((result) => {
            logger.debug(result);
        });
    }
    testGet() {
        let serviceProvider = new service_provider_1.ServiceProvider();
        serviceProvider.getEntity(19, new sizedoc_1.SizedocFactory())
            .subscribe((result) => {
            logger.debug('subscribe');
            logger.debug(JSON.stringify(result));
        }, (error) => {
            logger.error(error);
        }, () => {
            logger.debug('complete');
        });
    }
    testPostDelete() {
        let serviceProvider = new service_provider_1.ServiceProvider();
        let sizedoc = new sizedoc_1.SizedocFactory().createNew(0);
        serviceProvider.postEntity(sizedoc)
            .pipe(operators_1.mergeMap((result) => {
            logger.debug(`Создана сущность ${result}`);
            return serviceProvider.getEntity(result, new sizedoc_1.SizedocFactory());
        }), operators_1.mergeMap((result) => {
            return serviceProvider.deleteEntity(result);
        }))
            .subscribe((result) => {
            logger.debug(`subscribe сущность удалена ${result}`);
        });
    }
    /***/
    test() {
        this.testGetPeriod();
    }
}
exports.TestHttp = TestHttp;
