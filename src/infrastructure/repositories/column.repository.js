import { ObjectId } from "mongodb";
import { getCollection } from "../database/mongo-client.js";
export class ColumnRepository {
  async addColumn(column) {
    const collection = await getCollection("boards");
    const _id = new ObjectId(column.boardId);
    const existingBoard = await collection.findOne({ _id });
    if (!existingBoard) {
      throw new Error("El board no existe");
    }
    await collection.updateOne(
      { _id },
      {
        $push: {
          columns: {
            id: column.id,
            boardId: column.boardId,
            title: column.title,
            cards: [],
          },
        },
      },
    );
    return column;
  }
  async updateColumn(column) {
    const collection = await getCollection("boards");
    const _id = new ObjectId(column.boardId);
    const existingBoard = await collection.findOne({ _id });
    if (!existingBoard) {
      throw new Error("El board no existe");
    }
    await collection.updateOne(
      {
        _id,
        "columns.id": column.id,
      },
      {
        $set: {
          "columns.$.title": column.title,
        },
      },
    );
  }
  async deleteColumn(id, boardId) {
    const collection = await getCollection("boards");
    const _id = new ObjectId(boardId);
    const existingBoard = await collection.findOne({ _id });
    if (!existingBoard) {
      throw new Error("El board no existe");
    }
    const columnExists = existingBoard.columns.some((col) => col.id === id);
    if (!columnExists) {
      throw new Error("Column no encontrado");
    }
    if (
      existingBoard.columns.some((col) => col.cards.length > 0 && col.id === id)
    ) {
      throw new Error("No se puede eliminar una columna que contiene cards");
    }
    const result = await collection.updateOne(
      { _id },
      { $pull: { columns: { id } } },
    );
    if (result.matchedCount === 0) {
      throw new Error("Column no encontrado");
    }
  }
}
