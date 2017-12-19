"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TaskPlan {
    /**
     * @param info - Информация о таске
     * @param infoDetail - Подробная информация о таске
     * @param quQuantum - Количество квантов для планирования
     * @param task - Ссылка на созданную задачу
     * */
    constructor(id, info, infoDetail, quQuantum, task, object) {
        this.id = id;
        this.info = info;
        this.infoDetail = infoDetail;
        this.quQuantum = quQuantum;
        this.task = task;
        this.object = object;
        /***/
        this.selected = false;
    }
}
exports.TaskPlan = TaskPlan;
