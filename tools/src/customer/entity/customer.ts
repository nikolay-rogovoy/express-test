/**
 * Created by AtSoft on 2017-12-18
s */

import {CommonLib} from '../../common-lib';
import {Factory} from '../../factory';
import {IEntity} from '../../i-entity';
import {Entity} from '../../entity';



export class Customer extends Entity {

    /**Ключ сущности*/
    keyName = 'idcustomer';

    /**Наименование сущности*/
    entityName = 'customer';

    /**Загрузить из сырого объекта*/
    fromRawObject(source: any): void {
        CommonLib.copyProperty(this, source);

    }

    /**Конструктор*/
    constructor(
        /***/
        public idcustomer: number,
        /**Название\имя*/
        public name: string,
        /**Адрес*/
        public address: string,
        /**Телефон*/
        public phone: string,
        /**Активность*/
        public active: boolean,
        /**Комментарий*/
        public comment: string,
        /**Тип контрагента*/
        public idcustomertype: number,
        /**Создан*/
        public dtcre: Date,
        /**Электронная почта*/
        public email: string,
        /**Адрес*/
        public idaddress: number,
        /**Дата создания*/
        public dtdoc: Date,
        /**ИНН*/
        public inn: string,
        /**Обращение*/
        public idappeal: number,
        /**БИК*/
        public bankbik: string,
        /**Р\с*/
        public bankrs: string,
        /**К\с*/
        public bankks: string,
        /**Название банка*/
        public bankname: string,
        /**Владелец*/
        public idcustomerkey: number,
        /**Пароль*/
        public pass: string,
        /**Имя пользователя*/
        public login: string,
        /**Обращение*/
        public appeal_name: string,
        /**Владелец*/
        public customerkey_name: string,
        /**Тип контрагента*/
        public customertype_name: string
    ) {
        super();
    }

    /**Получить поля с датами*/
    getFieldDate(): string[] {
        return ['dtcre', 'dtdoc'];
    }
}


export class CustomerFactory extends Factory {

    /**Метод вызывается при создании объекта*/
    static creator(customer: Customer) {
        return customer;
    }

    /**Создать новый объект*/
    createNew(tmpId: number): IEntity {
        let varItem = new Customer(null, null, null, null, null, null, null, new Date(), null, null, CommonLib.getCurrentDate(), null, null, null, null, null, null, null, null, null, null, null, null);
        varItem.tmpId = tmpId;
        varItem.idcustomerkey = CommonLib.getCustomerKey();
        CustomerFactory.creator(varItem);
        return varItem;
    }

    /**Создать пустой объект*/
    createEmpty(): IEntity {
        let varItem = new Customer(null, null, null, null, null, null, null, new Date(), null, null, CommonLib.getCurrentDate(), null, null, null, null, null, null, null, null, null, null, null, null);
        varItem.idcustomerkey = CommonLib.getCustomerKey();
        return varItem;
    }
}


