import { ObjectId } from "mongodb";
import { Board } from "../../domain/board.type.js";
import { Card } from "../../domain/card.type.js";
import { Column } from "../../domain/column.type.js";
import { getCollection } from "../database/mongo-client.js";
import { Subtask } from "../../domain/subtask.type.js";
export class BoardRepository {
    async getBoards() {
        const collection = await getCollection("boards");
        const boardDocuments = await collection.find().toArray();
        return boardDocuments.map((doc) => new Board(doc._id.toString(), doc.name));
    }
    async getBoard(id) {
        const collection = await getCollection("boards");
        const boardId = new ObjectId(id);
        const boardDocuments = await collection.findOne({ _id: boardId });
        if (!boardDocuments) {
            return null;
        }
        return new Board(boardDocuments._id.toString(), boardDocuments.name, boardDocuments.columns.map((col) => new Column(col.id, boardId.toString(), col.title, col.cards.map((card) => new Card(card.id, col.id, card.title, card.labels, card.createdAt, card.description, card.startDate, card.endDate, card.subtasks.map((subtask) => new Subtask(subtask.id, card.id, subtask.title, subtask.completed)))))));
    }
    async addBoard(board) {
        const collection = await getCollection("boards");
        const existingBoard = await collection.findOne({ name: board.name });
        if (existingBoard) {
            throw new Error("El board ya existe");
        }
        const boardCreated = await collection.insertOne({
            name: board.name,
            columns: [],
        });
        return new Board(boardCreated.insertedId.toString(), board.name);
    }
    async updateBoard(board) {
        const collection = await getCollection("boards");
        const result = await collection.updateOne({ _id: new ObjectId(board.id) }, { $set: { name: board.name } });
        if (result.matchedCount === 0) {
            throw new Error("Board no encontrado");
        }
    }
    async deleteBoard(id) {
        const collection = await getCollection("boards");
        const existingBoard = await collection.findOne({ _id: new ObjectId(id) });
        if (existingBoard &&
            existingBoard.columns &&
            existingBoard.columns.length > 0) {
            throw new Error("No se puede eliminar un board con columnas asociadas");
        }
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            throw new Error("Board no encontrado");
        }
    }
}
