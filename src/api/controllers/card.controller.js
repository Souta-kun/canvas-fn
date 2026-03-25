import { addCardCase, deleteCardCase, moveCardCase, updateCardCase, } from "../../application/usecases/card/index.js";
import { fail, ok } from "../dtos/api-result.dto.js";
// POST → ADD_CARD
export const addCard = async (req, res) => {
    const { id, boardId, columnId, title, createdAt } = req.body;
    try {
        const card = await addCardCase(id, boardId, columnId, title, createdAt);
        return ok(res, 201, card);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Error al crear card";
        return fail(res, 404, message);
    }
};
// PUT → UPDATE_CARD
export const updateCard = async (req, res) => {
    try {
        await updateCardCase(req.body);
        return ok(res, 200, null);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Error al actualizar card";
        return fail(res, 404, message);
    }
};
// DELETE → DELETE_CARD
export const deleteCard = async (req, res) => {
    const { id, columnId, boardId } = req.body;
    try {
        await deleteCardCase(id, columnId, boardId);
        return ok(res, 200, null);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Error al eliminar card";
        return fail(res, 404, message);
    }
};
// PUT → MOVE_CARD
export const moveCard = async (req, res) => {
    const { cardId, sourceColumnId, targetColumnId, boardId, position } = req.body;
    try {
        await moveCardCase(boardId, cardId, sourceColumnId, targetColumnId, position);
        return ok(res, 200, null);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Error al mover card";
        return fail(res, 404, message);
    }
};
