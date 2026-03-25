import { ColumnRepository } from "../../../infrastructure/repositories/column.repository.js";
export const deleteColumnCase = async (id, boardId) => {
    const columnRepository = new ColumnRepository();
    if (!id) {
        throw new Error("ID de columna no proporcionado");
    }
    if (!boardId) {
        throw new Error("ID de board no proporcionado");
    }
    await columnRepository.deleteColumn(id, boardId);
};
