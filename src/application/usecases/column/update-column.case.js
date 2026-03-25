import { Column } from "../../../domain/column.type.js";
import { ColumnRepository } from "../../../infrastructure/repositories/column.repository.js";
export const updateColumnCase = async (id, boardId, title) => {
    const columnRepository = new ColumnRepository();
    const column = new Column(id, boardId, title);
    await columnRepository.updateColumn(column);
};
