import { Card } from "../../../domain/card.type.js";
import { Subtask } from "../../../domain/subtask.type.js";
import { CardRepository } from "../../../infrastructure/repositories/card.repository.js";
export const updateCardCase = (request) => {
    const cardRepository = new CardRepository();
    if (!request.id) {
        throw new Error("ID de card no proporcionado");
    }
    if (!request.columnId) {
        throw new Error("ID de columna no proporcionado");
    }
    if (!request.boardId) {
        throw new Error("ID de board no proporcionado");
    }
    const card = new Card(request.id, request.columnId, request.title, request.labels || [], Date.now(), request.description, request.startDate, request.endDate, request.subtasks?.map((subtask) => new Subtask(subtask.id, request.id, subtask.title, subtask.completed)) || []);
    return cardRepository.updateCard(card, request.boardId);
};
