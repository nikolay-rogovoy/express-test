export class Task {
    constructor(public id: number,
                public dtStart: Date,
                public dtEnd: Date,
                public name: string,
                public description: string,
                public object: Object) {
    }
}
