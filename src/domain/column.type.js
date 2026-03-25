export class Column {
    id;
    boardId;
    title;
    cards = [];
    constructor(id, boardId, title, cards = []) {
        this.validate(id, boardId, title);
        this.id = id;
        this.boardId = boardId;
        this.title = title;
        this.cards = cards;
    }
    validate(id, boardId, title) {
        if (!boardId?.trim()) {
            throw new Error("El boardId es requerido");
        }
        if (!title?.trim()) {
            throw new Error("El title es requerido");
        }
    }
}
