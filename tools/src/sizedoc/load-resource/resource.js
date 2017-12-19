"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Resource {
    /**
     * @param id Ид
     * @param name Наименование
     * @param description Описание
     * @param tasks Список задач на дени
     * @param powers Список с мощностями на даты данного ресурса
     * */
    constructor(id, name, description, tasks, powers, object) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.tasks = tasks;
        this.powers = powers;
        this.object = object;
        /**Выделенный ресурс*/
        this.selected = false;
        /**Показать временную шкалу*/
        this.showTimeLine = true;
    }
}
exports.Resource = Resource;
