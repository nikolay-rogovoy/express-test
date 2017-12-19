import {Task} from './task';

export class TimelineDailyItemQuantum {

    /**Инфа для отображении в ячейке*/
    get info() {
        return `${this.getTime(this.startTime)}`;
    }

    /***/
    selected = false;

    /***/
    getTime(time: number): string {
        return `${Math.floor(time / 60)}:${this.padRight((time - Math.floor(time / 60) * 60).toString(), 2)}`;
    }

    /***/
    padLeft(n: string, width: number, z = '0') {
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    /***/
    padRight(n: string, width: number, z = '0') {
        return n.length >= width ? n : n + new Array(width - n.length + 1).join(z);
    }

    /**
     * @param startTime Время начала кванта, минут
     * @param endTime Время конца кванта, минут
     * @param usage Есть назначенные таски
     * @param permitted Есть мощность
     * @param color Цвет
     * @param tasks Задачи
     * */
    constructor(public startTime: number,
                public endTime: number,
                public usage: boolean,
                public permitted: boolean,
                public color: string,
                public tasks: Task[]) {
    }

}
