export class Subtask {
    id;
    cardId;
    title;
    completed;
    constructor(id, cardId, title, completed) {
        this.validate(id, cardId, title);
        this.id = id;
        this.cardId = cardId;
        this.title = title;
        this.completed = completed ?? false;
    }
    validate(id, cardId, title) {
        if (!id?.trim()) {
            throw new Error("El id es requerido");
        }
        if (!cardId?.trim()) {
            throw new Error("El cardId es requerido");
        }
        if (!title?.trim()) {
            throw new Error("El title es requerido");
        }
    }
}
