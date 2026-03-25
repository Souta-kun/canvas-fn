import { Column } from "../../../domain/column.type.js";
import { ColumnRepository } from "../../../infrastructure/repositories/column.repository.js";
import { v4 as uuidv4 } from "uuid";
export const addColumnCase = async (boardId, title) => {
    const columnRepository = new ColumnRepository();
    const column = new Column(uuidv4(), boardId, title);
    return await columnRepository.addColumn(column);
};
