export class Card {
    id;
    columnId;
    title;
    description;
    labels;
    startDate;
    endDate;
    createdAt;
    subtasks = [];
    constructor(id, columnId, title, labels, createdAt, description, startDate, endDate, subtasks = []) {
        this.validate(id, columnId, title, createdAt);
        this.id = id;
        this.columnId = columnId;
        this.title = title;
        // seguros contra null/undefined
        this.labels = Array.isArray(labels) ? labels : [];
        this.createdAt = createdAt;
        if (description !== undefined)
            this.description = description;
        if (startDate !== undefined)
            this.startDate = startDate;
        if (endDate !== undefined)
            this.endDate = endDate;
        this.subtasks = subtasks;
    }
    validate(id, columnId, title, createdAt) {
        if (!id?.trim()) {
            throw new Error("El id es requerido");
        }
        if (!columnId?.trim()) {
            throw new Error("El columnId es requerido");
        }
        if (!title?.trim()) {
            throw new Error("El title es requerido");
        }
        if (!createdAt || isNaN(createdAt)) {
            throw new Error("createdAt es requerido y debe ser válido");
        }
    }
}
