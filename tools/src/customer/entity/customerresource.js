"use strict";
/**
 * Created by AtSoft on 2017-12-18
s */
Object.defineProperty(exports, "__esModule", { value: true });
const common_lib_1 = require("../../common-lib");
const factory_1 = require("../../factory");
const entity_1 = require("../../entity");
class Customerresource extends entity_1.Entity {
    /**Конструктор*/
    constructor(
        /***/
        idcustomerresource, 
        /**Ресурс*/
        idcustomer, 
        /**Наименование*/
        name, 
        /**Комментарий*/
        comment, 
        /**Дата начала*/
        dtstart, 
        /**Дата конца*/
        dtend, 
        /**Владелец*/
        idcustomerkey, 
        /**Ресурс*/
        customer_name, 
        /**Владелец*/
        customerkey_name) {
        super();
        this.idcustomerresource = idcustomerresource;
        this.idcustomer = idcustomer;
        this.name = name;
        this.comment = comment;
        this.dtstart = dtstart;
        this.dtend = dtend;
        this.idcustomerkey = idcustomerkey;
        this.customer_name = customer_name;
        this.customerkey_name = customerkey_name;
        /**Ключ сущности*/
        this.keyName = 'idcustomerresource';
        /**Наименование сущности*/
        this.entityName = 'customerresource';
    }
    /**Загрузить из сырого объекта*/
    fromRawObject(source) {
        common_lib_1.CommonLib.copyProperty(this, source);
    }
    /**Получить поля с датами*/
    getFieldDate() {
        return ['dtstart', 'dtend'];
    }
}
exports.Customerresource = Customerresource;
class CustomerresourceFactory extends factory_1.Factory {
    /**Метод вызывается при создании объекта*/
    static creator(customerresource) {
        return customerresource;
    }
    /**Создать новый объект*/
    createNew(tmpId) {
        let varItem = new Customerresource(null, null, null, null, new Date(), new Date(), null, null, null);
        varItem.tmpId = tmpId;
        varItem.idcustomerkey = common_lib_1.CommonLib.getCustomerKey();
        CustomerresourceFactory.creator(varItem);
        return varItem;
    }
    /**Создать пустой объект*/
    createEmpty() {
        let varItem = new Customerresource(null, null, null, null, new Date(), new Date(), null, null, null);
        varItem.idcustomerkey = common_lib_1.CommonLib.getCustomerKey();
        return varItem;
    }
}
exports.CustomerresourceFactory = CustomerresourceFactory;
