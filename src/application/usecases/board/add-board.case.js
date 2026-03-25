import { Board } from "../../../domain/board.type.js";
import { BoardRepository } from "../../../infrastructure/repositories/board.repository.js";
export const addBoardCase = async (name) => {
    const boardRepository = new BoardRepository();
    const board = new Board(undefined, name);
    return await boardRepository.addBoard(board);
};
