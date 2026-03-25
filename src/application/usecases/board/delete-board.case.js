import { BoardRepository } from "../../../infrastructure/repositories/board.repository.js";
export const deleteBoardCase = async (id) => {
    const boardRepository = new BoardRepository();
    if (!id) {
        throw new Error("ID de tablero no proporcionado");
    }
    await boardRepository.deleteBoard(id);
};
