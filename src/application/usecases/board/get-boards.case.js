import { BoardRepository } from "../../../infrastructure/repositories/board.repository.js";
export const getBoardsCase = async () => {
    const boardRepository = new BoardRepository();
    return await boardRepository.getBoards();
};
