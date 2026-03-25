import {} from "express";
import { addBoardCase, deleteBoardCase, getBoardCase, getBoardsCase, updateBoardCase, } from "../../application/usecases/board/index.js";
import { fail, ok } from "../dtos/api-result.dto.js";
// GET → GET_BOARDS
export const getBoards = async (req, res) => {
    try {
        const boards = await getBoardsCase();
        const response = boards.map((board) => ({
            id: board.id,
            name: board.name,
        }));
        return ok(res, 200, response);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Error al obtener boards";
        return fail(res, 404, message);
    }
};
// GET → GET_BOARD
export const getBoard = async (req, res) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    try {
        const board = await getBoardCase(id);
        if (!board) {
            return fail(res, 404, "Board no encontrado");
        }
        const response = {
            id: board.id,
            name: board.name,
            columns: board.columns.map((column) => ({
                id: column.id,
                title: column.title,
                cards: column.cards.map((card) => ({
                    id: card.id,
                    title: card.title,
                    description: card.description,
                    labels: card.labels,
                    subtasks: card.subtasks.map((subtask) => ({
                        id: subtask.id,
                        title: subtask.title,
                        completed: subtask.completed,
                    })),
                    startDate: card.startDate,
                    endDate: card.endDate,
                    createdAt: card.createdAt,
                })),
            })),
        };
        return ok(res, 200, response);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Error al obtener board";
        return fail(res, 404, message);
    }
};
// POST → ADD_BOARD
export const addBoard = async (req, res) => {
    const { name } = req.body;
    try {
        const board = await addBoardCase(name);
        return ok(res, 201, board);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Error al crear board";
        return fail(res, 400, message);
    }
};
// PUT → UPDATE_BOARD
export const updateBoard = async (req, res) => {
    const { id, name } = req.body;
    try {
        await updateBoardCase(id, name);
        return ok(res, 200, null);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Error al actualizar board";
        return fail(res, 404, message);
    }
};
// DELETE → DELETE_BOARD
export const deleteBoard = async (req, res) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    try {
        await deleteBoardCase(id);
        return ok(res, 200, null);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Error al eliminar board";
        return fail(res, 404, message);
    }
};
