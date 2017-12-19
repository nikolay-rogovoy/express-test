"use strict";
/**
 * Created by AtSoft on 2017-12-18
 s */
Object.defineProperty(exports, "__esModule", { value: true });
const common_lib_1 = require("../../common-lib");
const factory_1 = require("../../factory");
const entity_1 = require("../../entity");
class Sizedoc extends entity_1.Entity {
    /**Конструктор*/
    constructor(
        /***/
        idsizedoc, 
        /**Номер*/
        name, 
        /**Комментарий*/
        comment, 
        /**Дата*/
        dtdoc, 
        /**Создан*/
        dtcre, 
        /**Клиент*/
        idcustomer, 
        /**Сумма*/
        smdoc, 
        /**Себестоимость*/
        smdocmy, 
        /**Скидка*/
        smdiscount, 
        /**Скидка поставщика*/
        smdiscountmy, 
        /**Этаж*/
        floor, 
        /**Контактная информация*/
        contact, 
        /**Адрес*/
        address, 
        /**Обращение*/
        idappeal, 
        /**Владелец*/
        idcustomerkey, 
        /**Группа*/
        idsizedocgroup, 
        /**Создатель*/
        idcustomercre, 
        /**Ответственный*/
        idcustomerresp, 
        /**Замерщик*/
        idcustomersize, 
        /**Обращение*/
        appeal_name, 
        /**Клиент*/
        customer_name, 
        /**Владелец*/
        customerkey_name, 
        /**Группа*/
        sizedocgroup_name, 
        /**Создатель*/
        customercre_name, 
        /**Ответственный*/
        customerresp_name, 
        /**Замерщик*/
        customersize_name) {
        super();
        this.idsizedoc = idsizedoc;
        this.name = name;
        this.comment = comment;
        this.dtdoc = dtdoc;
        this.dtcre = dtcre;
        this.idcustomer = idcustomer;
        this.smdoc = smdoc;
        this.smdocmy = smdocmy;
        this.smdiscount = smdiscount;
        this.smdiscountmy = smdiscountmy;
        this.floor = floor;
        this.contact = contact;
        this.address = address;
        this.idappeal = idappeal;
        this.idcustomerkey = idcustomerkey;
        this.idsizedocgroup = idsizedocgroup;
        this.idcustomercre = idcustomercre;
        this.idcustomerresp = idcustomerresp;
        this.idcustomersize = idcustomersize;
        this.appeal_name = appeal_name;
        this.customer_name = customer_name;
        this.customerkey_name = customerkey_name;
        this.sizedocgroup_name = sizedocgroup_name;
        this.customercre_name = customercre_name;
        this.customerresp_name = customerresp_name;
        this.customersize_name = customersize_name;
        /**Ключ сущности*/
        this.keyName = 'idsizedoc';
        /**Наименование сущности*/
        this.entityName = 'sizedoc';
    }
    /**Загрузить из сырого объекта*/
    fromRawObject(source) {
        common_lib_1.CommonLib.copyProperty(this, source);
    }
    /**Получить поля с датами*/
    getFieldDate() {
        return ['dtdoc', 'dtcre'];
    }
}
exports.Sizedoc = Sizedoc;
class SizedocFactory extends factory_1.Factory {
    /**Метод вызывается при создании объекта*/
    static creator(sizedoc) {
        return sizedoc;
    }
    /**Создать новый объект*/
    createNew(tmpId) {
        let varItem = new Sizedoc(null, null, null, common_lib_1.CommonLib.getCurrentDate(), new Date(), null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        varItem.tmpId = tmpId;
        varItem.idcustomerkey = common_lib_1.CommonLib.getCustomerKey();
        SizedocFactory.creator(varItem);
        return varItem;
    }
    /**Создать пустой объект*/
    createEmpty() {
        let varItem = new Sizedoc(null, null, null, common_lib_1.CommonLib.getCurrentDate(), new Date(), null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        varItem.idcustomerkey = common_lib_1.CommonLib.getCustomerKey();
        return varItem;
    }
}
exports.SizedocFactory = SizedocFactory;
