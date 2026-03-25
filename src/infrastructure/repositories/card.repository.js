import { ObjectId } from "mongodb";
import { getCollection } from "../database/mongo-client.js";
export class CardRepository {
    async addCard(card, boardId) {
        const collection = await getCollection("boards");
        const _id = new ObjectId(boardId);
        const existingBoard = await collection.findOne({ _id });
        if (!existingBoard) {
            throw new Error("El board no existe");
        }
        await collection.updateOne({ _id }, {
            $push: {
                "columns.$[col].cards": card,
            },
        }, {
            arrayFilters: [{ "col.id": card.columnId }],
        });
        return card;
    }
    async updateCard(card, boardId) {
        const collection = await getCollection("boards");
        const _id = new ObjectId(boardId);
        const existingBoard = await collection.findOne({ _id });
        if (!existingBoard) {
            throw new Error("El board no existe");
        }
        const setFields = Object.entries(card).reduce((acc, [key, value]) => {
            if (key !== "columnId") {
                acc[`columns.$[col].cards.$[c].${key}`] = value;
            }
            return acc;
        }, {});
        await collection.updateOne({ _id: new ObjectId(boardId) }, {
            $set: setFields,
        }, {
            arrayFilters: [{ "col.id": card.columnId }, { "c.id": card.id }],
        });
    }
    async deleteCard(id, columnId, boardId) {
        const collection = await getCollection("boards");
        const _id = new ObjectId(boardId);
        const existingBoard = await collection.findOne({ _id });
        if (!existingBoard) {
            throw new Error("El board no existe");
        }
        const result = await collection.updateOne({ _id }, {
            $pull: {
                "columns.$[col].cards": { id: id },
            },
        }, {
            arrayFilters: [{ "col.id": columnId }],
        });
        if (result.matchedCount === 0) {
            throw new Error("Card no encontrado");
        }
    }
    async moveCard(boardId, cardId, sourceColumnId, targetColumnId, position) {
        const collection = await getCollection("boards");
        const _id = new ObjectId(boardId);
        const existingBoard = await collection.findOne({ _id });
        if (!existingBoard) {
            throw new Error("El board no existe");
        }
        const cardToMove = existingBoard.columns
            .find((col) => col.id === sourceColumnId)
            ?.cards.find((card) => card.id === cardId);
        if (!cardToMove) {
            throw new Error("Card no encontrado en la columna de origen");
        }
        await collection.updateOne({ _id }, {
            $pull: {
                "columns.$[sourceCol].cards": { id: cardId },
            },
        }, {
            arrayFilters: [{ "sourceCol.id": sourceColumnId }],
        });
        await collection.updateOne({ _id }, {
            $push: {
                "columns.$[targetCol].cards": {
                    $each: [cardToMove],
                    $position: position,
                },
            },
        }, {
            arrayFilters: [{ "targetCol.id": targetColumnId }],
        });
    }
}
