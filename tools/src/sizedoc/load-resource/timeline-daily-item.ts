import {TimelineDailyItemQuantum} from './timeline-daily-item-quantum';

export class TimelineDailyItem {

    /***/
    constructor (
        public date: Date,
        public times: TimelineDailyItemQuantum[]
    ) { }
}
