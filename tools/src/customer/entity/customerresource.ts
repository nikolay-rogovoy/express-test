/**
 * Created by AtSoft on 2017-12-18
s */

import {CommonLib} from '../../common-lib';
import {Factory} from '../../factory';
import {IEntity} from '../../i-entity';
import {Entity} from '../../entity';



export class Customerresource extends Entity {

    /**Ключ сущности*/
    keyName = 'idcustomerresource';

    /**Наименование сущности*/
    entityName = 'customerresource';

    /**Загрузить из сырого объекта*/
    fromRawObject(source: any): void {
        CommonLib.copyProperty(this, source);

    }

    /**Конструктор*/
    constructor(
        /***/
        public idcustomerresource: number,
        /**Ресурс*/
        public idcustomer: number,
        /**Наименование*/
        public name: string,
        /**Комментарий*/
        public comment: string,
        /**Дата начала*/
        public dtstart: Date,
        /**Дата конца*/
        public dtend: Date,
        /**Владелец*/
        public idcustomerkey: number,
        /**Ресурс*/
        public customer_name: string,
        /**Владелец*/
        public customerkey_name: string
    ) {
        super();
    }

    /**Получить поля с датами*/
    getFieldDate(): string[] {
        return ['dtstart', 'dtend'];
    }
}


export class CustomerresourceFactory extends Factory {

    /**Метод вызывается при создании объекта*/
    static creator(customerresource: Customerresource) {
        return customerresource;
    }

    /**Создать новый объект*/
    createNew(tmpId: number): IEntity {
        let varItem = new Customerresource(null, null, null, null, new Date(), new Date(), null, null, null);
        varItem.tmpId = tmpId;
        varItem.idcustomerkey = CommonLib.getCustomerKey();
        CustomerresourceFactory.creator(varItem);
        return varItem;
    }

    /**Создать пустой объект*/
    createEmpty(): IEntity {
        let varItem = new Customerresource(null, null, null, null, new Date(), new Date(), null, null, null);
        varItem.idcustomerkey = CommonLib.getCustomerKey();
        return varItem;
    }
}


