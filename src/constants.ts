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
    left: -1,
    right: 1,
} as const;
