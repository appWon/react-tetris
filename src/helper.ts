// constance
import { COLUMN, TETROMINO_LIST } from "./constants";

//type
import { Board, Position } from "./types";

export const getRandomColor = (): string => {
    const colorPick = [...Array(3)].map(
        (_) => Math.floor(Math.random() * 155) + 100
    );

    return `rgb(${colorPick.join(",")})`;
};

export const getTetromino = () => {
    const color = getRandomColor();
    const randomBlock = Math.floor(Math.random() * TETROMINO_LIST.length);

    return TETROMINO_LIST[randomBlock].map((row) =>
        row.map((cell) => cell && color)
    );
};

export const drawRender = (
    position: Position,
    tetromino: Board,
    render: Board
) => {
    tetromino
        .filter((row) => row.some((v) => v))
        .forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                if (cell) {
                    render[rowIndex + position.y][columnIndex + position.x] =
                        cell;
                }
            });
        });

    return render;
};

export const checkDuplicated = (
    position: Position,
    tetromino: Board,
    render: Board
) => {
    return tetromino
        .filter((row) => row.some((v) => v))
        .some((row, rowIndex) =>
            row.some((cell, columnIndex) => {
                const findRender =
                    render?.[rowIndex + position.y]?.[columnIndex + position.x];

                if (cell && findRender) return true;
                else if (cell && findRender === undefined) return true;
            })
        );
};

export const clearLineLength = (render: Board) => {
    return render.filter((row) => row.every((v) => v)).length;
};

export const fillCell = (_: unknown) => [...Array(COLUMN)].fill(null);
