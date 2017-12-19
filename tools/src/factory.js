"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("./entity");
/**Фабрика*/
class Factory {
    /**Создать новый объект*/
    createNew(tmpId) {
        let e = new entity_1.Entity();
        e.tmpId = tmpId;
        return e;
    }
    /**Создать пустой объект*/
    createEmpty() {
        return new entity_1.Entity();
    }
}
exports.Factory = Factory;
