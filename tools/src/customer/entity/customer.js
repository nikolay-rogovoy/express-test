"use strict";
/**
 * Created by AtSoft on 2017-12-18
s */
Object.defineProperty(exports, "__esModule", { value: true });
const common_lib_1 = require("../../common-lib");
const factory_1 = require("../../factory");
const entity_1 = require("../../entity");
class Customer extends entity_1.Entity {
    /**Конструктор*/
    constructor(
        /***/
        idcustomer, 
        /**Название\имя*/
        name, 
        /**Адрес*/
        address, 
        /**Телефон*/
        phone, 
        /**Активность*/
        active, 
        /**Комментарий*/
        comment, 
        /**Тип контрагента*/
        idcustomertype, 
        /**Создан*/
        dtcre, 
        /**Электронная почта*/
        email, 
        /**Адрес*/
        idaddress, 
        /**Дата создания*/
        dtdoc, 
        /**ИНН*/
        inn, 
        /**Обращение*/
        idappeal, 
        /**БИК*/
        bankbik, 
        /**Р\с*/
        bankrs, 
        /**К\с*/
        bankks, 
        /**Название банка*/
        bankname, 
        /**Владелец*/
        idcustomerkey, 
        /**Пароль*/
        pass, 
        /**Имя пользователя*/
        login, 
        /**Обращение*/
        appeal_name, 
        /**Владелец*/
        customerkey_name, 
        /**Тип контрагента*/
        customertype_name) {
        super();
        this.idcustomer = idcustomer;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.active = active;
        this.comment = comment;
        this.idcustomertype = idcustomertype;
        this.dtcre = dtcre;
        this.email = email;
        this.idaddress = idaddress;
        this.dtdoc = dtdoc;
        this.inn = inn;
        this.idappeal = idappeal;
        this.bankbik = bankbik;
        this.bankrs = bankrs;
        this.bankks = bankks;
        this.bankname = bankname;
        this.idcustomerkey = idcustomerkey;
        this.pass = pass;
        this.login = login;
        this.appeal_name = appeal_name;
        this.customerkey_name = customerkey_name;
        this.customertype_name = customertype_name;
        /**Ключ сущности*/
        this.keyName = 'idcustomer';
        /**Наименование сущности*/
        this.entityName = 'customer';
    }
    /**Загрузить из сырого объекта*/
    fromRawObject(source) {
        common_lib_1.CommonLib.copyProperty(this, source);
    }
    /**Получить поля с датами*/
    getFieldDate() {
        return ['dtcre', 'dtdoc'];
    }
}
exports.Customer = Customer;
class CustomerFactory extends factory_1.Factory {
    /**Метод вызывается при создании объекта*/
    static creator(customer) {
        return customer;
    }
    /**Создать новый объект*/
    createNew(tmpId) {
        let varItem = new Customer(null, null, null, null, null, null, null, new Date(), null, null, common_lib_1.CommonLib.getCurrentDate(), null, null, null, null, null, null, null, null, null, null, null, null);
        varItem.tmpId = tmpId;
        varItem.idcustomerkey = common_lib_1.CommonLib.getCustomerKey();
        CustomerFactory.creator(varItem);
        return varItem;
    }
    /**Создать пустой объект*/
    createEmpty() {
        let varItem = new Customer(null, null, null, null, null, null, null, new Date(), null, null, common_lib_1.CommonLib.getCurrentDate(), null, null, null, null, null, null, null, null, null, null, null, null);
        varItem.idcustomerkey = common_lib_1.CommonLib.getCustomerKey();
        return varItem;
    }
}
exports.CustomerFactory = CustomerFactory;
