import {Task} from './task';
import {Power} from './power';
import {TimelineItem} from "./timeline-item";
import {TimelineDailyItem} from "./timeline-daily-item";

export class Resource {

    /**Выделенный ресурс*/
    selected: boolean = false;

    /**Показать временную шкалу*/
    showTimeLine = true;

    /**Строка дней*/
    timelineItems: TimelineItem[];

    /**Детализация дня*/
    timelineDailyItems: TimelineDailyItem[];

    /**
     * @param id Ид
     * @param name Наименование
     * @param description Описание
     * @param tasks Список задач на дени
     * @param powers Список с мощностями на даты данного ресурса
     * */
    constructor(public id: number,
                public name: string,
                public description: string,
                public tasks: Task[],
                public powers: Power[],
                public object: Object
    ) {
    }
}
