import { CardRepository } from "../../../infrastructure/repositories/card.repository.js";
export const deleteCardCase = async (id, columnId, boardId) => {
    const cardRepository = new CardRepository();
    if (!id) {
        throw new Error("ID de card no proporcionado");
    }
    if (!columnId) {
        throw new Error("ID de columna no proporcionado");
    }
    if (!boardId) {
        throw new Error("ID de board no proporcionado");
    }
    await cardRepository.deleteCard(id, columnId, boardId);
};
