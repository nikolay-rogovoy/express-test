/**
 * Created by AtSoft on 2017-12-18
 s */

import {CommonLib} from '../../common-lib';
import {Factory} from '../../factory';
import {IEntity} from '../../i-entity';
import {Entity} from '../../entity';



export class Sizedoc extends Entity {

    /**Ключ сущности*/
    keyName = 'idsizedoc';

    /**Наименование сущности*/
    entityName = 'sizedoc';

    /**Загрузить из сырого объекта*/
    fromRawObject(source: any): void {
        CommonLib.copyProperty(this, source);

    }

    /**Конструктор*/
    constructor(
        /***/
        public idsizedoc: number,
        /**Номер*/
        public name: string,
        /**Комментарий*/
        public comment: string,
        /**Дата*/
        public dtdoc: Date,
        /**Создан*/
        public dtcre: Date,
        /**Клиент*/
        public idcustomer: number,
        /**Сумма*/
        public smdoc: number,
        /**Себестоимость*/
        public smdocmy: number,
        /**Скидка*/
        public smdiscount: number,
        /**Скидка поставщика*/
        public smdiscountmy: number,
        /**Этаж*/
        public floor: number,
        /**Контактная информация*/
        public contact: number,
        /**Адрес*/
        public address: number,
        /**Обращение*/
        public idappeal: number,
        /**Владелец*/
        public idcustomerkey: number,
        /**Группа*/
        public idsizedocgroup: number,
        /**Создатель*/
        public idcustomercre: number,
        /**Ответственный*/
        public idcustomerresp: number,
        /**Замерщик*/
        public idcustomersize: number,
        /**Обращение*/
        public appeal_name: string,
        /**Клиент*/
        public customer_name: string,
        /**Владелец*/
        public customerkey_name: string,
        /**Группа*/
        public sizedocgroup_name: string,
        /**Создатель*/
        public customercre_name: string,
        /**Ответственный*/
        public customerresp_name: string,
        /**Замерщик*/
        public customersize_name: string
    ) {
        super();
    }

    /**Получить поля с датами*/
    getFieldDate(): string[] {
        return ['dtdoc', 'dtcre'];
    }
}


export class SizedocFactory extends Factory {

    /**Метод вызывается при создании объекта*/
    static creator(sizedoc: Sizedoc) {
        return sizedoc;
    }

    /**Создать новый объект*/
    createNew(tmpId: number): IEntity {
        let varItem = new Sizedoc(null, null, null, CommonLib.getCurrentDate(), new Date(), null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        varItem.tmpId = tmpId;
        varItem.idcustomerkey = CommonLib.getCustomerKey();
        SizedocFactory.creator(varItem);
        return varItem;
    }

    /**Создать пустой объект*/
    createEmpty(): IEntity {
        let varItem = new Sizedoc(null, null, null, CommonLib.getCurrentDate(), new Date(), null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        varItem.idcustomerkey = CommonLib.getCustomerKey();
        return varItem;
    }
}


