import { Board } from "../../../domain/board.type.js";
import { BoardRepository } from "../../../infrastructure/repositories/board.repository.js";
export const updateBoardCase = async (id, name) => {
    const boardRepository = new BoardRepository();
    const board = new Board(id, name);
    await boardRepository.updateBoard(board);
};
