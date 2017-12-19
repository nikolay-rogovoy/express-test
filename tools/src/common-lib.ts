import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {Observable} from 'rxjs/Observable';
import {Entity} from './entity';
import {IEntity} from './i-entity';
import {ServiceProvider} from './service-provider';
import {Customer, CustomerFactory} from './customer/entity/customer';
import {of} from 'rxjs/observable/of';
import {_throw} from 'rxjs/observable/throw';

/**Библиотека*/
export  class CommonLib {
    /**Вхождение элемента в массив*/
    static includes<T>(array: Array<T>, searchElement: T, fromIndex = 0): boolean {
        let len: number = array.length;
        if (len === 0) {
            return false;
        }
        let n: number = fromIndex;
        let k: number;
        if (n >= 0) {
            k = n;
        } else {
            k = len + n;
            if (k < 0) {
                k = 0;
            }
        }
        while (k < len) {
            let currentElement: T = array[k];
            if (searchElement === currentElement ||
                (searchElement !== searchElement && currentElement !== currentElement)
            ) {
                return true;
            }
            k++;
        }
        return false;
    }

    /**Дату в строку*/
    static dateToString(date: Date) {
        let curr_date = ('00' + date.getDate());
        curr_date = curr_date.substr(curr_date.length - 2);

        let curr_month = ('00' + (date.getMonth() + 1));
        curr_month = curr_month.substr(curr_month.length - 2);

        let curr_year = ('0000' + date.getFullYear());
        curr_year = curr_year.substr(curr_year.length - 4);

        return curr_date + '.' + curr_month + '.' + curr_year;
    }

    /**Дату в сстроку с временем*/
    static toDateTime = function () {

        let curr_seconds = ('00' + this.getSeconds());
        curr_seconds = curr_seconds.substr(curr_seconds.length - 2);

        let curr_minutes = ('00' + this.getMinutes());
        curr_minutes = curr_minutes.substr(curr_minutes.length - 2);

        let curr_hours = ('00' + this.getHours());
        curr_hours = curr_hours.substr(curr_hours.length - 2);

        let curr_date = ('00' + this.getDate());
        curr_date = curr_date.substr(curr_date.length - 2);

        let curr_month = ('00' + (this.getMonth() + 1));
        curr_month = curr_month.substr(curr_month.length - 2);

        let curr_year = ('0000' + this.getFullYear());
        curr_year = curr_year.substr(curr_year.length - 4);

        return curr_year + '-' + curr_month + '-' + curr_date + ' ' + curr_hours + ':' + curr_minutes + ':' + curr_seconds;
    };

    /**Извечь данные*/
    static extractData(data: Object, entity: Entity) {
        // Даты объекта
        let dateProps = entity.getFieldDate();

        let body = JSON.parse(JSON.stringify(data),
            (key, value) => {
                if (value != null) {
                    if (CommonLib.includes(dateProps, key)) {
                        return new Date(value);
                    }
                }
                return value;
            });

        // This server always wraps JSON results in an object with a data property.
        // You have to unwrap it to get the heroes.
        // This is conventional web API behavior, driven by security concerns.
        // Make no assumptions about the server API. Not all servers return an object with a data property.
        // https://angular.io/docs/ts/latest/guide/server-communication.html#!#http-client
        // return body.data || { };

        // console.log("extractData2");
        // console.log(body);

        return body || {};
    }

    /**Обработка ошибки извлечения данных*/
    static handleError(error): ErrorObservable {
        console.error(error);
        return _throw(error.toString());
    }

    /**Получить текущую дату клиента без времени*/
    static getCurrentDate(): Date {
        let t = new Date();
        return new Date(t.getFullYear(), t.getMonth(), t.getDate());
    }

    /**Скопировать объект*/
    static assign(dest: any, source: any): void {
        for (let prop of source) {
            dest[prop] = source[prop];
        }
    }

    /**Объект из сырых данных*/
    static toInstance<T>(dest: T, rawSource: any): T {
        // Если есть спец. метод извлечения, то вызываем его
        if (typeof dest['fromRawObject'] === 'function') {
            dest['fromRawObject'](rawSource);
        } else {
            // Просто копируем свойства
            CommonLib.copyProperty(dest, rawSource);
        }
        return dest;
    }

    /**Копирование свойств из сырого объекта*/
    static copyProperty<T>(dest: T, rawSource: any): T {
        for (let propName in rawSource) {
            if (rawSource.hasOwnProperty(propName)) {
                dest[propName] = rawSource[propName];
            }
        }
        return dest;
    }


    /**Урл к апи*/

    /*
    static getApiUrl(): string {
      return 'http://localhost:3003/api/';
    }
    */

    /**Урл к апи*/
    static getNewTempId(entityList: IEntity[]): number {
        let tmpId = 1;
        for (let entity of entityList) {
            if (entity.tmpId != null && entity.tmpId >= tmpId) {
                tmpId = entity.tmpId + 1;
            }
        }
        return tmpId;
    }

    /**Формат даты и времени для текущего пользователя*/
    static getDateTimeFormat(): string {
        return 'dd.MM.yyyy HH:mm';
    }

    /**Формат даты для текущего пользователя*/
    static getDateFormat(): string {
        return 'dd.MM.yyyy';
    }

    /**Формат даты и времени для контролов*/
    static getDateTimeFormatUniversal(): string {
        return 'yyyy-MM-dd HH:mm';
    }

    /**Формат даты для контролов*/
    static getDateFormatUniversal(): string {
        return 'yyyy-MM-dd';
    }

    /**Генерация отчета*/
    static renderReport(dataSourceName: string, pattern: string, dataSource: Array<any>) {
        let result = pattern;
        // console.log(`iterate start ${dataSourceName} \n result=\n${result}`);

        // Ищем дата сурс в шаблоне
        let regExpStr = `{{${dataSourceName}\\.loop}}[\\s\\w\\W]*?{{${dataSourceName}\\.endloop}}`;
        // console.log(`regExpStr = ${regExpStr}`);
        let regExp = new RegExp(regExpStr, 'gm');
        if (dataSource != null && dataSource.length > 0) {
            // Есть записи, ищем шаблон
            let regExpResult = pattern.match(regExp);
            // Если в шаблоне есть итератор для сущности
            if (regExpResult != null && regExpResult.length > 0) {
                // Шаблон для сущности
                for (let iterateItem of pattern.match(regExp)) {
                    // Убираем из шаблона указатели на источник данных
                    let iterateItemClear = iterateItem.replace(new RegExp(`^{{${dataSourceName}\\.loop}}`, 'gm'), '');
                    iterateItemClear = iterateItemClear.replace(new RegExp(`{{${dataSourceName}\\.endloop}}$`, 'gm'), '');
                    // console.log(iterateItemClear);
                    // Из шаблона генерим пачку шаблонов
                    let newDataArr = '';
                    for (let obj of dataSource) {
                        let newData = iterateItemClear;
                        // Провести интерполяцию :)
                        for (let prop in obj) {
                            if (Array.isArray(obj[prop])) {
                                // Рекурсия дальше
                                newData = CommonLib.renderReport(prop, newData, obj[prop]);
                            } else {
                                let valuetToReplace = obj[prop];
                                if (valuetToReplace == null) {
                                    valuetToReplace = '';
                                }
                                // Регулярное выражение поиска полей интерполяции
                                let refExpValue = new RegExp(`{{${dataSourceName}\\.${prop}(\\|date)?(\\|number)?(\\|currency)?}}`, 'g');
                                let dataSourceValue = pattern.match(refExpValue);
                                if (dataSourceValue != null) {
                                    // Меняем в шаблоне
                                    for (let iterateItemValue of dataSourceValue) {
                                        let valuetToReplaceFormat = valuetToReplace;
                                        if (iterateItemValue.includes('|date')) {
                                            let dt = new Date(valuetToReplace);
                                            valuetToReplaceFormat = CommonLib.formatApp(dt);
                                        } else if (iterateItemValue.includes('|number')) {
                                            let num = +valuetToReplace;
                                            let language = navigator.language;
                                            valuetToReplaceFormat = num.toLocaleString(language);
                                        } else if (iterateItemValue.includes('|currency')) {
                                            let num = +valuetToReplace;
                                            let language = navigator.language;
                                            valuetToReplaceFormat = num.toLocaleString(language, {'minimumFractionDigits': 2});
                                        }
                                        // console.log(`iterateItemValue : ${iterateItemValue}; valuetToReplaceFormat : ${valuetToReplaceFormat}; newData : ${newData}`);
                                        newData = newData.replace(iterateItemValue, valuetToReplaceFormat);
                                        // console.log(`newData : ${newData}`);
                                    }
                                }
                                // console.log(`prop : ${prop} = ${obj[prop]}`);
                            }
                        }
                        newDataArr += newData;
                    }// Обходим сущности
                    // Заменяем в шаблоне
                    result = result.replace(new RegExp(regExpStr, 'm'), newDataArr);
                }// Обходим шаблоны
            }// Нет шаблона
        } else {
            // Нет записей для сущности - генерить нечего
            result = pattern.replace(regExp, '');
        }
        // console.log(`iterate end ${dataSourceName}`);
        return result;
    }

    static formatApp(date: Date) {
        let mm = date.getMonth() + 1; // getMonth() is zero-based
        let dd = date.getDate();

        return [
            (dd > 9 ? '' : '0') + dd,
            (mm > 9 ? '' : '0') + mm,
            date.getFullYear()
        ].join('.');
    }

    /**Форматировать телефон*/
    static getFormatPhone(phone: string): string {
        // Удалить все кроме цифер
        phone = phone.replace(/\D/g, '');

        // Добавляем разделители
        if (phone.length === 0) {
            phone = '';
        } else if (phone.length <= 1) {
            phone = phone.replace(/^(\d{0,1})/, '+$1');
        } else if (phone.length <= 4) {
            phone = phone.replace(/^(\d{0,1})(\d{0,3})/, '+$1($2');
        } else if (phone.length <= 7) {
            phone = phone.replace(/^(\d{0,1})(\d{0,3})(\d{0,3})/, '+$1($2) $3');
        } else if (phone.length <= 9) {
            phone = phone.replace(/^(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})/, '+$1($2) $3-$4');
        } else {
            phone = phone.replace(/^(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(.*)/, '+$1($2) $3-$4-$5');
        }
        return phone;
    }

    /**initCap*/
    static initCap(str: string) {
        return str.toLowerCase().replace(/(?:^|\s)[a-z]/g, (m) => { return m.toUpperCase(); });
    }

    /**Получить ключ дилера*/
    static getCustomerKey(): number {
        return 1;
    }

    /**Сгенерить наименование*/
    static generateName(entity: IEntity, service: ServiceProvider): Observable<IEntity> {
        if (entity.entityName === 'appeal'
            || entity.entityName === 'assembly'
            || entity.entityName === 'orderdoc'
            || entity.entityName === 'delivery'
            || entity.entityName === 'event'
            || entity.entityName === 'lesson'
            || entity.entityName === 'task'
            || entity.entityName === 'agreement'
            || entity.entityName === 'sizedoc'
            || entity.entityName === 'servce'
            || entity.entityName === 'news') {
            return service.getDocNum(entity.entityName).map(docNum => {
                entity['name'] = docNum;
                return entity;
            });
        } else {
            return of(entity);
        }
    }

    /**Получить своего сотрудника*/
    static getMycustomer(): Customer {
        // TODO - Припилить в авторизации
        let customer = new CustomerFactory().createNew(0) as Customer;
        customer.idcustomer = +localStorage.getItem('idcustomer');
        customer.name = localStorage.getItem('customer_name');
        return customer;
    }
}
