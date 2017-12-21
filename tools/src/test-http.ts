import {ServiceProvider} from "./service-provider";
import {SizedocFactory} from "./sizedoc/entity/sizedoc";
import {map, mergeMap} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {IEntity} from "./i-entity";
import {SizedocstagevalueFactory} from "./sizedoc/entity/sizedocstagevalue";

var lib = require('./lib.js');
var logger = require("../logger.js");

/**Базовый сервис*/
export class TestHttp {
    constructor () {
    }

    testGetPeriod () {
        const currDate = new Date();
        const dates = [
            new Date(currDate.getUTCFullYear(), currDate.getUTCMonth(), currDate.getUTCDate()),
            new Date(currDate.getUTCFullYear(), currDate.getUTCMonth(), currDate.getUTCDate() + 1),
            new Date(currDate.getUTCFullYear(), currDate.getUTCMonth(), currDate.getUTCDate() + 2)
        ];

        const serviceProvider = new ServiceProvider();

        let dtMin = dates[0];
        let dtMax = dates[dates.length - 1];

        let dtMax1 = new Date(dtMax);
        dtMax1.setTime(dtMax.getTime() + 1 * 86400000);

        serviceProvider.getEntityForFieldRange('plandate',
            `${dtMin.getFullYear()}${dtMin.getMonth() + 1}${dtMin.getDate()}`,
            `${dtMax1.getFullYear()}${dtMax1.getMonth() + 1}${dtMax1.getDate()}`,
            new SizedocstagevalueFactory())
            .subscribe(
                (result) => {

                    logger.debug(result);
                }
            );

    }

    testGet() {
        let serviceProvider = new ServiceProvider();
        serviceProvider.getEntity(19, new SizedocFactory())
            .subscribe((result) => {
                    logger.debug('subscribe');
                    logger.debug(JSON.stringify(result));
                },
                (error) => {
                    logger.error(error);
                },
                () => {
                    logger.debug('complete');
                }
            );
    }

    testPostDelete() {
        let serviceProvider = new ServiceProvider();
        let sizedoc = new SizedocFactory().createNew(0);
        serviceProvider.postEntity(sizedoc)
            .pipe(
                mergeMap((result: number) => {
                    logger.debug(`Создана сущность ${result}`);
                    return serviceProvider.getEntity(result, new SizedocFactory());
                }),
                mergeMap((result: IEntity) => {
                    return serviceProvider.deleteEntity(result);
                })
            )
            .subscribe((result) => {
                logger.debug(`subscribe сущность удалена ${result}`);
            });
    }


    /***/
    test() {
        this.testGetPeriod();
    }
}
