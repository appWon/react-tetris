// type
import { BlockType } from "./types";

// 초기 block 센터링
export const INIT_POSITION = { x: 5, y: 0 };

// 테트리스 가로세로 크기
export const ROW = 24;
export const COLUMN = 12;

// 블록 모양
export const BLOCK_LIST = [
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ],
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ],
    [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
    ],
    [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    [
        [1, 1],
        [1, 1],
    ],
];

// 좌우 이동 상수
export const LEFT_OR_RIGHT = {
    LEFT: -1,
    RIGHT: 1,
} as const;

// 테트리슽 타일 상수
export const CellState: BlockType = {
    color: "black",
    state: "blank",
};

export const MOVE = {
    UP: "ArrowUp",
    DOWN: "ArrowDown",
    LEFT: "ArrowLeft",
    RIGHT: "ArrowRight",
} as const;

export const INIT_GAME_STATE = {
    state: "stop",
    position: INIT_POSITION,
};

export const INIT_RENDER_ARR = [...Array(COLUMN)].map<BlockType[]>((_) =>
    [...Array(ROW)].fill(CellState)
);

// nextBlock render 갯수 설정
export const NEXT_BLOCK_LENGTH = 4;
