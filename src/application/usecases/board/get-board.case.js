import { BoardRepository } from "../../../infrastructure/repositories/board.repository.js";
export const getBoardCase = async (id) => {
    const boardRepository = new BoardRepository();
    if (!id) {
        throw new Error("ID de tablero no proporcionado");
    }
    const board = await boardRepository.getBoard(id);
    if (!board) {
        throw new Error("Tablero no encontrado");
    }
    return board;
};
