"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
const from_1 = require("rxjs/observable/from");
const forkJoin_1 = require("rxjs/observable/forkJoin");
const sizedoc_1 = require("../entity/sizedoc");
const customer_1 = require("../../customer/entity/customer");
const customerresource_1 = require("../../customer/entity/customerresource");
const sizedocstagevalue_1 = require("../entity/sizedocstagevalue");
const service_provider_1 = require("../../service-provider");
const resource_1 = require("./resource");
const task_1 = require("./task");
const power_1 = require("./power");
const task_plan_1 = require("./task-plan");
var logger = require("../../../logger.js");
/***/
class SizedocPlanComponent {
    constructor() {
        /**Тип документа*/
        this.docTypeName = '';
        /***/
        this.resources = [];
        /***/
        this.days = [];
        this.service = new service_provider_1.ServiceProvider();
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
            let observableNeed = this.service.getEntityForField('idcustomersize', null, new sizedoc_1.SizedocFactory())
                .pipe(operators_1.map(sizedocs => sizedocs));
            // Получить ресурсы и распределенные таски
            let observableResources = this.service.getEntityListForParent('customertype', 11, new customer_1.CustomerFactory())
                .pipe(operators_1.map((customers) => customers), operators_1.map((customers) => customers.filter(customer => customer.idcustomertype === 11)), operators_1.mergeMap((customers) => {
                // Разделяем массив
                return from_1.from(customers);
            }), operators_1.mergeMap((customer) => {
                // По ресурсу получить его мощности
                return this.service.getEntityListForParent('customer', customer.idcustomer, new customerresource_1.CustomerresourceFactory())
                    .pipe(operators_1.map((customerresources) => {
                    let res = {
                        customer,
                        customerresources: customerresources
                    };
                    return res;
                }));
            }), operators_1.mergeMap((resource) => {
                // По ресурсу получить его задачи
                return this.service.getEntityForField('idcustomersize', resource.customer.idcustomer.toString(), new sizedoc_1.SizedocFactory())
                    .pipe(
                // Конвертим тип
                operators_1.map((entitys) => entitys), 
                // Запускаем итератор
                operators_1.mergeMap((sizedocs) => {
                    // Заходим в документы
                    return from_1.from(sizedocs);
                }), operators_1.mergeMap((sizedoc) => {
                    // Получить этапы документа
                    return this.service.getEntityListForParent('sizedoc', sizedoc.idsizedoc, new sizedocstagevalue_1.SizedocstagevalueFactory())
                        .pipe(operators_1.map((sizedocstagevalues) => {
                        let res = {
                            sizedoc,
                            sizedocstagevalues: sizedocstagevalues
                        };
                        return res;
                    }));
                }), operators_1.filter((resourceTask) => {
                    // Отбираем подходящие таски
                    // Начало переода
                    let dtStart = this.days[0];
                    // Конец периода
                    let dtEnd = this.days[this.days.length - 1];
                    if (resourceTask.sizedocstagevalues.filter(x => x.idsizedocstage === 1 && x.plandate >= dtStart).length
                        && resourceTask.sizedocstagevalues.filter(x => x.idsizedocstage === 2 && x.plandate <= dtEnd).length) {
                        return true;
                    }
                    return false;
                }), operators_1.reduce((acc, cur) => {
                    // Собрали таски ресурса в массив
                    acc.push(cur);
                    return acc;
                }, []), operators_1.map((resourceTasks) => {
                    let res = {
                        resource: resource,
                        resourceTasks: resourceTasks
                    };
                    return res;
                }));
            }), operators_1.reduce((acc, cur) => {
                // Собрали ресурсы в массив
                acc.push(cur);
                return acc;
            }, []));
            forkJoin_1.forkJoin(observableNeed, observableResources, (sizedocs, resources) => {
                let res = {
                    sizedocs,
                    resources
                };
                return res;
            })
                .subscribe((result) => {
                // Делаем ресурсы для компонента
                this.resources = [];
                for (let iResourceT of result.resources) {
                    let tasks = [];
                    for (let resourceTask of iResourceT.resourceTasks) {
                        let dtStart = resourceTask.sizedocstagevalues.filter(x => x.idsizedocstage === 1)[0].plandate;
                        let dtEnd = resourceTask.sizedocstagevalues.filter(x => x.idsizedocstage === 2)[0].plandate;
                        tasks.push(new task_1.Task(resourceTask.sizedoc.idsizedoc, new Date(dtStart.getFullYear(), dtStart.getMonth(), dtStart.getDate(), dtStart.getHours()), new Date(dtEnd.getFullYear(), dtEnd.getMonth(), dtEnd.getDate(), dtEnd.getHours()), resourceTask.sizedoc.name, resourceTask.sizedoc.customer_name, resourceTask));
                    }
                    let powers = [];
                    for (let customerresource of iResourceT.resource.customerresources) {
                        powers.push(new power_1.Power(customerresource.dtstart, customerresource.dtend));
                    }
                    this.resources.push(new resource_1.Resource(iResourceT.resource.customer.idcustomer, iResourceT.resource.customer.name, iResourceT.resource.customer.comment, tasks, powers, iResourceT));
                }
                // Неназначенные документы замеров
                let taskPlans = [];
                for (let sizedoc of result.sizedocs) {
                    taskPlans.push(new task_plan_1.TaskPlan(sizedoc.idsizedoc, sizedoc.name, sizedoc.customer_name, 1, null, sizedoc));
                }
                // TODO
                logger.debug(this.resources);
                // this.rmSource.resources.next(this.resources);
                // this.rmSource.taskPlans.next(taskPlans);
            });
        }
    }
}
exports.SizedocPlanComponent = SizedocPlanComponent;
