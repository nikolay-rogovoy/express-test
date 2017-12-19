"use strict";
/**
 * Created by AtSoft on 2017-12-18
s */
Object.defineProperty(exports, "__esModule", { value: true });
const common_lib_1 = require("../../common-lib");
const factory_1 = require("../../factory");
const entity_1 = require("../../entity");
class Sizedocstagevalue extends entity_1.Entity {
    /**Конструктор*/
    constructor(
        /***/
        idsizedocstagevalue, 
        /**Замер*/
        idsizedoc, 
        /**Этап замера*/
        idsizedocstage, 
        /**Комментарий*/
        comment, 
        /**Создан*/
        dtcre, 
        /**Обновлен*/
        dtupd, 
        /**Плановая дата*/
        plandate, 
        /**Фактическая дата*/
        factdate, 
        /**Участок*/
        workshop, 
        /**Партия*/
        poolnum, 
        /**Порция в партии*/
        posgroup, 
        /**Продолжительность*/
        duration, 
        /**Номер в порции*/
        sortnum, 
        /***/
        idcustomerkey, 
        /**Замер*/
        sizedoc_name, 
        /**Этап замера*/
        sizedocstage_name, 
        /***/
        customerkey_name) {
        super();
        this.idsizedocstagevalue = idsizedocstagevalue;
        this.idsizedoc = idsizedoc;
        this.idsizedocstage = idsizedocstage;
        this.comment = comment;
        this.dtcre = dtcre;
        this.dtupd = dtupd;
        this.plandate = plandate;
        this.factdate = factdate;
        this.workshop = workshop;
        this.poolnum = poolnum;
        this.posgroup = posgroup;
        this.duration = duration;
        this.sortnum = sortnum;
        this.idcustomerkey = idcustomerkey;
        this.sizedoc_name = sizedoc_name;
        this.sizedocstage_name = sizedocstage_name;
        this.customerkey_name = customerkey_name;
        /**Ключ сущности*/
        this.keyName = 'idsizedocstagevalue';
        /**Наименование сущности*/
        this.entityName = 'sizedocstagevalue';
    }
    /**Загрузить из сырого объекта*/
    fromRawObject(source) {
        common_lib_1.CommonLib.copyProperty(this, source);
    }
    /**Получить поля с датами*/
    getFieldDate() {
        return ['dtcre', 'dtupd', 'plandate', 'factdate'];
    }
}
exports.Sizedocstagevalue = Sizedocstagevalue;
class SizedocstagevalueFactory extends factory_1.Factory {
    /**Метод вызывается при создании объекта*/
    static creator(sizedocstagevalue) {
        return sizedocstagevalue;
    }
    /**Создать новый объект*/
    createNew(tmpId) {
        let varItem = new Sizedocstagevalue(null, null, null, null, new Date(), new Date(), new Date(), new Date(), null, null, null, null, null, null, null, null, null);
        varItem.tmpId = tmpId;
        varItem.idcustomerkey = common_lib_1.CommonLib.getCustomerKey();
        SizedocstagevalueFactory.creator(varItem);
        return varItem;
    }
    /**Создать пустой объект*/
    createEmpty() {
        let varItem = new Sizedocstagevalue(null, null, null, null, new Date(), new Date(), new Date(), new Date(), null, null, null, null, null, null, null, null, null);
        varItem.idcustomerkey = common_lib_1.CommonLib.getCustomerKey();
        return varItem;
    }
}
exports.SizedocstagevalueFactory = SizedocstagevalueFactory;
