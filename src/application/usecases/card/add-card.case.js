import { v4 as uuidv4 } from "uuid";
import { Card } from "../../../domain/card.type.js";
import { CardRepository } from "../../../infrastructure/repositories/card.repository.js";
export const addCardCase = async (boardId, columnId, title, createdAt) => {
    const cardRepository = new CardRepository();
    const card = new Card(uuidv4(), columnId, title, [], createdAt);
    return await cardRepository.addCard(card, boardId);
};
