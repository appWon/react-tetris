// constance
import { BLOCK_LIST, CellState, COLUMN, ROW } from "./constants";

//type
import { BlockType } from "./types";

/**
 * 랜덤 color 반환함수 (오픈소스)
 */
export const getRandomColor = (): string => {
    const colorPick = [...Array(3)].map(
        (_) => Math.floor(Math.random() * 155) + 100
    );

    return `rgb(${colorPick.join(",")})`;
};

/**
 * dropBlock 정보 세팅 함수
 * constance의 BlockList 배열에서 1에 대한 정보 입력
 */
export const getDropBlock = () => {
    const color = getRandomColor();
    const randomBlock = Math.floor(Math.random() * BLOCK_LIST.length);

    return BLOCK_LIST[randomBlock]
        .filter((arr) => arr.some((v) => v))
        .reduce<BlockType[][]>((pre, rowArr) => {
            const rows = rowArr.map<BlockType>((block) => {
                return block === 1
                    ? {
                          state: "drop",
                          color,
                      }
                    : CellState;
            });
            return [...pre, rows];
        }, []);
};

export const check = (border: BlockType[][]) => {
    for (let column = 0; column < border.length; column++) {
        for (let row = 0; row < border[0].length; row++) {
            if (border[column][row].state === "duplicated") {
                return false;
            }
        }
    }

    return true;
};

export const setRender = (toBeRenderArr: BlockType[][]) => {
    const fixedBlockArr = toBeRenderArr.map<BlockType[]>((column) =>
        column.map<BlockType>((row) => ({
            ...row,
            state: row.state === "drop" ? "fixed" : row.state,
        }))
    );

    for (let row = 0; row < ROW; row++) {
        let lineIsFull = true;

        for (let column = 0; column < COLUMN; column++) {
            if (fixedBlockArr[column][row].state === "blank") {
                lineIsFull = false;
                break;
            }
        }

        if (lineIsFull) {
            for (let column = 0; column < COLUMN; column++) {
                fixedBlockArr[column].splice(row, 1);
                fixedBlockArr[column].unshift(CellState);
            }
        }
    }

    return fixedBlockArr;
};

export const setGameEnd = (toBeRenderArr: BlockType[][]) => {
    return toBeRenderArr.map((column) => {
        return column.map((v) => {
            return { ...v, color: v.state !== "blank" ? "gray" : v.color };
        });
    });
};
