import { addColumnCase, deleteColumnCase, updateColumnCase, } from "../../application/usecases/column/index.js";
import { fail, ok } from "../dtos/api-result.dto.js";
// POST → ADD_COLUMN
export const addColumn = async (req, res) => {
    const { boardId, title } = req.body;
    try {
        const column = await addColumnCase(boardId, title);
        return ok(res, 201, column);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Error al crear column";
        return fail(res, 404, message);
    }
};
// PUT → UPDATE_COLUMN
export const updateColumn = async (req, res) => {
    const { id, boardId, title } = req.body;
    try {
        await updateColumnCase(id, boardId, title);
        return ok(res, 200, null);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Error al actualizar column";
        return fail(res, 404, message);
    }
};
// DELETE → DELETE_COLUMN
export const deleteColumn = async (req, res) => {
    const { id, boardId } = req.body;
    try {
        await deleteColumnCase(id, boardId);
        return ok(res, 200, null);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Error al eliminar column";
        return fail(res, 404, message);
    }
};
