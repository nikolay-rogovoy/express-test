"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TimelineDailyItemQuantum {
    /**
     * @param startTime Время начала кванта, минут
     * @param endTime Время конца кванта, минут
     * @param usage Есть назначенные таски
     * @param permitted Есть мощность
     * @param color Цвет
     * @param tasks Задачи
     * */
    constructor(startTime, endTime, usage, permitted, color, tasks) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.usage = usage;
        this.permitted = permitted;
        this.color = color;
        this.tasks = tasks;
        /***/
        this.selected = false;
    }
    /**Инфа для отображении в ячейке*/
    get info() {
        return `${this.getTime(this.startTime)}`;
    }
    /***/
    getTime(time) {
        return `${Math.floor(time / 60)}:${this.padRight((time - Math.floor(time / 60) * 60).toString(), 2)}`;
    }
    /***/
    padLeft(n, width, z = '0') {
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }
    /***/
    padRight(n, width, z = '0') {
        return n.length >= width ? n : n + new Array(width - n.length + 1).join(z);
    }
}
exports.TimelineDailyItemQuantum = TimelineDailyItemQuantum;
