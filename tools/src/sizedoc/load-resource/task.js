"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Task {
    constructor(id, dtStart, dtEnd, name, description, object) {
        this.id = id;
        this.dtStart = dtStart;
        this.dtEnd = dtEnd;
        this.name = name;
        this.description = description;
        this.object = object;
    }
}
exports.Task = Task;
