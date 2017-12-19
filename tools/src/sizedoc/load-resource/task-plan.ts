import {Task} from "./task";

export class TaskPlan {

    /***/
    selected = false;

    /**
     * @param info - Информация о таске
     * @param infoDetail - Подробная информация о таске
     * @param quQuantum - Количество квантов для планирования
     * @param task - Ссылка на созданную задачу
     * */
    constructor(
        public id: number,
        public info: string,
        public infoDetail: string,
        public quQuantum: number,
        public task: Task,
        public object: Object) {
    }
}
