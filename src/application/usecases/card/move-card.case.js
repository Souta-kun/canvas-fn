import { CardRepository } from "../../../infrastructure/repositories/card.repository.js";
export const moveCardCase = async (boardId, cardId, sourceColumnId, targetColumnId, position) => {
    const cardRepository = new CardRepository();
    if (!cardId) {
        throw new Error("ID de card no proporcionado");
    }
    if (!sourceColumnId) {
        throw new Error("ID de columna de origen no proporcionado");
    }
    if (!targetColumnId) {
        throw new Error("ID de columna de destino no proporcionado");
    }
    if (!boardId) {
        throw new Error("ID de board no proporcionado");
    }
    if (position === undefined || position < 0) {
        throw new Error("Posición no proporcionada o inválida");
    }
    await cardRepository.moveCard(boardId, cardId, sourceColumnId, targetColumnId, position);
};
