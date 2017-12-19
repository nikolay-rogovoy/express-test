"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_lib_1 = require("./common-lib");
/**Сущность*/
class Entity {
    /**Загрузить из сырого объекта*/
    fromRawObject(source) {
        throw new Error('fromRawObject not implemented');
    }
    /**Присваевание сущностей*/
    assign(source) {
        common_lib_1.CommonLib.assign(this, source);
    }
    /**Сравнение сущностей*/
    equals(source) {
        if (this[this.keyName] != null
            && this[this.keyName] === source[source.keyName]) {
            return true;
        }
        if (this.tmpId != null && this.tmpId === source.tmpId) {
            return true;
        }
        return false;
    }
    /**Получить поля с датами*/
    getFieldDate() {
        return new Array();
    }
}
exports.Entity = Entity;
