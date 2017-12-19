/**
 * Created by AtSoft on 2017-12-18
s */

import {CommonLib} from '../../common-lib';
import {Factory} from '../../factory';
import {IEntity} from '../../i-entity';
import {Entity} from '../../entity';



export class Sizedocstagevalue extends Entity {

    /**Ключ сущности*/
    keyName = 'idsizedocstagevalue';

    /**Наименование сущности*/
    entityName = 'sizedocstagevalue';

    /**Загрузить из сырого объекта*/
    fromRawObject(source: any): void {
        CommonLib.copyProperty(this, source);

    }

    /**Конструктор*/
    constructor(
        /***/
        public idsizedocstagevalue: number,
        /**Замер*/
        public idsizedoc: number,
        /**Этап замера*/
        public idsizedocstage: number,
        /**Комментарий*/
        public comment: string,
        /**Создан*/
        public dtcre: Date,
        /**Обновлен*/
        public dtupd: Date,
        /**Плановая дата*/
        public plandate: Date,
        /**Фактическая дата*/
        public factdate: Date,
        /**Участок*/
        public workshop: number,
        /**Партия*/
        public poolnum: number,
        /**Порция в партии*/
        public posgroup: number,
        /**Продолжительность*/
        public duration: number,
        /**Номер в порции*/
        public sortnum: number,
        /***/
        public idcustomerkey: number,
        /**Замер*/
        public sizedoc_name: string,
        /**Этап замера*/
        public sizedocstage_name: string,
        /***/
        public customerkey_name: string
    ) {
        super();
    }

    /**Получить поля с датами*/
    getFieldDate(): string[] {
        return ['dtcre', 'dtupd', 'plandate', 'factdate'];
    }
}


export class SizedocstagevalueFactory extends Factory {

    /**Метод вызывается при создании объекта*/
    static creator(sizedocstagevalue: Sizedocstagevalue) {
        return sizedocstagevalue;
    }

    /**Создать новый объект*/
    createNew(tmpId: number): IEntity {
        let varItem = new Sizedocstagevalue(null, null, null, null, new Date(), new Date(), new Date(), new Date(), null, null, null, null, null, null, null, null, null);
        varItem.tmpId = tmpId;
        varItem.idcustomerkey = CommonLib.getCustomerKey();
        SizedocstagevalueFactory.creator(varItem);
        return varItem;
    }

    /**Создать пустой объект*/
    createEmpty(): IEntity {
        let varItem = new Sizedocstagevalue(null, null, null, null, new Date(), new Date(), new Date(), new Date(), null, null, null, null, null, null, null, null, null);
        varItem.idcustomerkey = CommonLib.getCustomerKey();
        return varItem;
    }
}


