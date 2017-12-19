import {filter, map, mergeMap, reduce} from "rxjs/operators";
import {from} from "rxjs/observable/from";
import {forkJoin} from "rxjs/observable/forkJoin";

import {Sizedoc, SizedocFactory} from "../entity/sizedoc";
import {Customer, CustomerFactory} from "../../customer/entity/customer";
import {IEntity} from "../../i-entity";
import {Customerresource, CustomerresourceFactory} from "../../customer/entity/customerresource";
import {IResource} from "./i-resource";
import {IResourceTask} from "./i-resource-task";
import {Sizedocstagevalue, SizedocstagevalueFactory} from "../entity/sizedocstagevalue";
import {IResourceT} from "./i-resource-t";
import {IResources} from "./i-resources";
import {ServiceProvider} from "../../service-provider";
import {Resource} from "./resource";
import {Task} from "./task";
import {Power} from "./power";
import {TaskPlan} from "./task-plan";
import {Observable} from "rxjs/Observable";

var logger = require("../../../logger.js");



/***/
export class SizedocPlanComponent {

    /**Тип документа*/
    docTypeName = '';

    /***/
    resources: Resource[] = [];

    /***/
    days: Date[] = [];

    service: ServiceProvider = new ServiceProvider();

    constructor() {

        let year = new Date().getFullYear();
        let month = new Date().getMonth();
        let date = new Date().getDate();
        for (let i = 0; i < 3; i++) {
            this.days.push(new Date(year, month, date + i));
        }
    }

    /***/
    test() {

        /*
        this.service.getEntity(20, new SizedocFactory())
            .subscribe(result => {
                console.log(result);
            })
        */

        this.loadResources();
    }

    /***/
    /***/
    loadResources() {
        // Получить список ресурсов
        if (this.days.length) {

            // Получить что нужно распределить
            let observableNeed = this.service.getEntityForField('idcustomersize', null, new SizedocFactory())
                .pipe(map(sizedocs => <Sizedoc[]>sizedocs));

            // Получить ресурсы и распределенные таски
            let observableResources = this.service.getEntityListForParent('customertype', 11, new CustomerFactory())
                .pipe(
                    map((customers: IEntity[]) => <Customer[]>customers),
                    map((customers: Customer[]) => customers.filter(customer => customer.idcustomertype === 11)),
                    mergeMap((customers: Customer[]) => {
                        // Разделяем массив
                        return from(customers);
                    }),
                    mergeMap((customer: Customer) => {
                        // По ресурсу получить его мощности
                        return this.service.getEntityListForParent('customer', customer.idcustomer, new CustomerresourceFactory())
                            .pipe(map((customerresources: IEntity[]) => {
                                let res: IResource = {
                                    customer,
                                    customerresources: <Customerresource[]>customerresources
                                };
                                return res;
                            }));
                    }),
                    mergeMap((resource: IResource) => {
                        // По ресурсу получить его задачи
                        return this.service.getEntityForField('idcustomersize', resource.customer.idcustomer.toString(), new SizedocFactory())
                            .pipe(
                                // Конвертим тип
                                map((entitys: IEntity[]) => <Sizedoc[]>entitys),
                                // Запускаем итератор
                                mergeMap((sizedocs: Sizedoc[]) => {
                                    // Заходим в документы
                                    return from(sizedocs);
                                }),
                                mergeMap((sizedoc: Sizedoc) => {
                                    // Получить этапы документа
                                    return this.service.getEntityListForParent('sizedoc', sizedoc.idsizedoc, new SizedocstagevalueFactory())
                                        .pipe(map((sizedocstagevalues: IEntity[]) => {
                                            let res: IResourceTask = {
                                                sizedoc,
                                                sizedocstagevalues: <Sizedocstagevalue[]>sizedocstagevalues
                                            };
                                            return res;
                                        }));
                                }),
                                filter((resourceTask: IResourceTask) => {
                                    // Отбираем подходящие таски
                                    // Начало переода
                                    let dtStart = this.days[0];
                                    // Конец периода
                                    let dtEnd = this.days[this.days.length - 1];
                                    if (resourceTask.sizedocstagevalues.filter(x => x.idsizedocstage === 1 && x.plandate >= dtStart).length
                                        && resourceTask.sizedocstagevalues.filter(x => x.idsizedocstage === 2 && x.plandate <= dtEnd).length
                                    ) {
                                        return true;
                                    }
                                    return false;
                                }),
                                reduce((acc, cur: IResourceTask) => {
                                    // Собрали таски ресурса в массив
                                    acc.push(cur);
                                    return acc;
                                }, []),
                                map((resourceTasks: IResourceTask[]) => {
                                    let res: IResourceT = {
                                        resource: resource,
                                        resourceTasks: resourceTasks
                                    };
                                    return res;
                                })
                            );
                    }),
                    reduce((acc, cur: IResourceT) => {
                        // Собрали ресурсы в массив
                        acc.push(cur);
                        return acc;
                    }, [])
                );
            forkJoin(observableNeed, observableResources, (sizedocs, resources) => {
                let res: IResources = {
                    sizedocs,
                    resources
                };
                return res;
            })
                .subscribe(
                    (result: IResources) => {
                        // Делаем ресурсы для компонента
                        this.resources = [];
                        for (let iResourceT of result.resources) {
                            let tasks: Task[] = [];
                            for (let resourceTask of iResourceT.resourceTasks) {
                                let dtStart = resourceTask.sizedocstagevalues.filter(x => x.idsizedocstage === 1)[0].plandate;
                                let dtEnd = resourceTask.sizedocstagevalues.filter(x => x.idsizedocstage === 2)[0].plandate;
                                tasks.push(new Task(resourceTask.sizedoc.idsizedoc, new Date(dtStart.getFullYear(), dtStart.getMonth(), dtStart.getDate(), dtStart.getHours()),
                                    new Date(dtEnd.getFullYear(), dtEnd.getMonth(), dtEnd.getDate(), dtEnd.getHours()),
                                    resourceTask.sizedoc.name, resourceTask.sizedoc.customer_name, resourceTask));
                            }
                            let powers: Power[] = [];
                            for (let customerresource of iResourceT.resource.customerresources) {
                                powers.push(new Power(customerresource.dtstart, customerresource.dtend));
                            }
                            this.resources.push(new Resource(iResourceT.resource.customer.idcustomer, iResourceT.resource.customer.name,
                                iResourceT.resource.customer.comment, tasks, powers, iResourceT));
                        }
                        // Неназначенные документы замеров
                        let taskPlans: TaskPlan[] = [];
                        for (let sizedoc of result.sizedocs) {
                            taskPlans.push(new TaskPlan(sizedoc.idsizedoc, sizedoc.name, sizedoc.customer_name, 1, null, sizedoc));
                        }

                        // TODO
                        logger.debug(this.resources);
                        // this.rmSource.resources.next(this.resources);
                        // this.rmSource.taskPlans.next(taskPlans);
                    }
                );
        }
    }
}
