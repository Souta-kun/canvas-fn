import { Card } from "../../../domain/card.type.js";
import { CardRepository } from "../../../infrastructure/repositories/card.repository.js";
export const addCardCase = async (id, boardId, columnId, title, createdAt) => {
  const cardRepository = new CardRepository();
  const card = new Card(id, columnId, title, [], createdAt);
  return await cardRepository.addCard(card, boardId);
};
