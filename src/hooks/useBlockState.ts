import { useState, useEffect, KeyboardEvent } from "react";
import { useSelector, useDispatch } from "react-redux";

// 상수
import {
    ROW,
    INIT_POSITION,
    LEFT_OR_RIGHT,
    INIT_RENDER_ARR,
    NEXT_BLOCK_LENGTH,
} from "../constants";

// helper 함수
import { check, getDropBlock, setGameEnd, setRender } from "../helper";

//store
import { nextBlock, setNextBlocks } from "../store/reducer/nextBlock";
import {
    gameState,
    setPosition,
    setIsPlaying,
    setResetPostion,
    setGameResult,
} from "../store/reducer/gameState";

// type
import { BlockType, RowWidth, LeftOrRight } from "../types";

export const useBlockState = () => {
    const dispatch = useDispatch();
    const { nextBlocks } = useSelector(nextBlock);
    const { isPlaying, position } = useSelector(gameState);
    const [renderBlock, setRenderBlock] = useState<BlockType[][]>([]);
    const [fixedBlock, setFixedBlock] = useState<BlockType[][]>([]);

    /**
     * 처음 테트리스 타일 배열 초기화 Hook
     */

    useEffect(() => {
        const initDropBlock = [...Array(NEXT_BLOCK_LENGTH)].map((_) =>
            getDropBlock()
        );

        fixToGrid(INIT_RENDER_ARR);
        dispatch(setNextBlocks(initDropBlock));
    }, [isPlaying]);

    /**
     * 테트리스 1초마다 y축 1씩 떨어트리는 Hook
     */
    useEffect(() => {
        if (isPlaying !== "playing") return;

        const interval = setInterval(() => setMoveY(), 1000);

        return () => clearInterval(interval);
    }, [isPlaying, position.y]);

    /**
     * position y 상태에 따른 hook
     * - 과정
     * 1. 떨어지는 블럭의 높이와 y값 비교 후 화면 렌더링
     * 2. renderToGrid() 함수를 통해 y축이 증가 되었을 경우 상태 확인 후 중복이 있다면 증가 되기전 renderArr를 테트리스 렌더링 타일로 등록
     * 3. 증복 블럭이 없다면 테트리스 렌더링 타일로 등록
     */
    useEffect(() => {
        if (isPlaying === "end") return;

        const blockHeight = nextBlocks[0]?.[0].length || 0;

        if (position.y + blockHeight > ROW) {
            fixToGrid(renderBlock);
            return;
        }

        let renderArr = renderToGrid(position);

        if (!check(renderArr)) {
            if (position.y === 0) {
                renderArr = setGameEnd(renderArr);

                dispatch(setGameResult("LOSER"));
                dispatch(setIsPlaying("end"));
            } else {
                fixToGrid(renderBlock);
            }
        }

        setRenderBlock(renderArr);
    }, [position, nextBlocks, fixedBlock, isPlaying]);

    /**
     * 떨어지는 블록 좌우 이동시 실행 함수
     * -과정
     * 1. 떨어지는 블록과 x축 계산 후 테트리스 타일을 벗어 났을 경우 함수 종료
     * 2. 떨어지는 블록과 x축 계산 후 중복 블록이 있다면 함수 종료
     * 3. 1~2번 항목에 대해 해당사항이 없다면 x축 state 등록 및 화면 렌더링
     */
    const setMoveX = (rightOrLeft: LeftOrRight): void => {
        if (
            position.x + rightOrLeft + nextBlocks[0].length >= 13 ||
            position.x + rightOrLeft < 0
        )
            return;

        const renderingView = renderToGrid({
            y: position.y,
            x: rightOrLeft + position.x,
        });

        for (let i = 0; i < renderingView.length; i++) {
            if (renderingView[i].some((v) => v.state === "duplicated")) return;
        }

        dispatch(setPosition({ x: rightOrLeft, y: 0 }));
    };

    /**
     * 테트리스 아래로 한칸 움직이는 함수
     */
    const setMoveY = (): void => {
        dispatch(setPosition({ x: 0, y: 1 }));
    };

    /**
     * 떨어지는 블록 회전하는 함수
     */
    const setRotateDropBlock = (): void => {
        const currentBlockSize = nextBlocks[0].length;

        if (currentBlockSize <= 2 && position.x + currentBlockSize === 12) {
            if (currentBlockSize === 2) {
                dispatch(setPosition({ x: -1, y: 0 }));
            } else {
                dispatch(setPosition({ x: -3, y: 0 }));
            }
        }

        const roateBlock = nextBlocks[0][0].map((_, index) =>
            nextBlocks[0].map((row) => row[index]).reverse()
        );

        // dispatch
        dispatch(setNextBlocks([roateBlock, ...nextBlocks.slice(1)]));
    };

    /**
     * 테트리스 블럭을 타일에 그려주는 함수
     * - 과정
     * 1. 현재 화면에 그려져 있는 떨어지는 블록을 지운다.
     * 2. 증가된 y값을 이용하여 다시 떨어지는 블록을 표시한다.
     * 3. 만약 증가된 y값을 더한 블록 위치가 이미 화면에 고정된(fixed) 블록이 있다면 중복 블록으로 상태를 변경
     * 4. 위 과정을 거친후 배열 반환
     */
    const renderToGrid = ({ x, y }: RowWidth): BlockType[][] => {
        if (fixedBlock.length === 0) return [];

        const copyBorder = JSON.parse(JSON.stringify(fixedBlock));
        const filterBlock = nextBlocks[0].filter((arr) =>
            arr.some(({ state }) => state === "drop")
        );

        for (let column = 0; column < filterBlock.length; column++) {
            for (let row = 0; row < filterBlock[0].length; row++) {
                if (filterBlock[column][row].state === "blank") continue;

                let borderValue = copyBorder[column + x][row + y];

                if (borderValue.state === "fixed") {
                    borderValue.state = "duplicated";
                    continue;
                }

                borderValue.state = "drop";
                borderValue.color =
                    isPlaying === "stop"
                        ? "unset"
                        : filterBlock[column][row].color;
            }
        }

        return copyBorder;
    };

    /**
     * 테트리스 타일 화면에 그리기 및 줄 완성 했을 경우 사라지게 하는 함수
     * 1. 배열에 떨어지는 블록(state === drop)을 고정(fixed)으로 변경
     * 2. y축 각 줄마다 꽉 찼는지 확인 후 공백이 없다면 제거
     * 3. 제거한 줄 수 만큼 다시 빈 칸 추가
     * 4. 화면 렌더링 및 떨어지는 블록, y축 초기화
     */
    const fixToGrid = (renderArr: BlockType[][]): void => {
        const newNextBlocks = [...nextBlocks.slice(1), getDropBlock()];

        dispatch(setNextBlocks(newNextBlocks));
        dispatch(setResetPostion(INIT_POSITION));
        setFixedBlock(setRender(renderArr));
    };

    /**
     * space 눌럿을 경우 블럭 떨어트리는 함수
     * - 과정
     * 1. 렌더링한 배열에 떨어지는 블록이 위치한 y축 데이터 전체를 가져온다.
     * 2. 떨어지는 블록에서 실제로 영역을 표시한 부분 중 가장 아랫부분의 위치 값을 뽑아온다.
     * 3. 2번에서 저장한 위치 값중 가장 큰값을 기준으로 테트리스 타일 마지막까지 1씩 증가하면서 블럭(fixed) 위치 확인
     * 4. 렌더링 위해 fixToGrid함수에 agument로 반환
     */
    const setDropToEnd = (): void => {
        const sliceBlock = renderBlock.slice(
            position.x,
            position.x + nextBlocks[0].length
        );

        const findDropBlockArr: number[] = nextBlocks[0].map((row) => {
            return (
                row.length -
                [...row].reverse().findIndex((obj) => obj.state === "drop")
            );
        });

        for (let i = 0; i < 24 - Math.max(...findDropBlockArr); i++) {
            if (
                findDropBlockArr
                    .map(
                        (arrIdx, sliceIdx) =>
                            sliceBlock[sliceIdx][arrIdx + i].state === "fixed"
                    )
                    .some((v) => v)
            ) {
                fixToGrid(renderToGrid({ x: position.x, y: i }));
                return;
            }
        }

        const renderArr = renderToGrid({
            x: position.x,
            y: 24 - Math.max(...findDropBlockArr),
        });

        fixToGrid(renderArr);
    };

    /**
     *  게임 종료시 화면 처리 함수
     */

    const endGame = () => {
        const endGameRenderArr = renderBlock.map<BlockType[]>((row) =>
            row.map<BlockType>((info) => ({
                ...info,
                color: info.state === "blank" ? "black" : "gray",
            }))
        );

        return endGameRenderArr;
    };

    /**
     * 키 입력 함수
     */
    const blockControl = ({ code }: KeyboardEvent<HTMLDivElement>) => {
        if (isPlaying !== "playing") return;

        if (code === "ArrowLeft") {
            setMoveX(LEFT_OR_RIGHT.LEFT);
        } else if (code === "ArrowRight") {
            setMoveX(LEFT_OR_RIGHT.RIGHT);
        } else if (code === "ArrowUp") {
            setRotateDropBlock();
        } else if (code === "ArrowDown") {
            setMoveY();
        } else if (code === "Space") {
            setDropToEnd();
        }
    };

    return {
        renderBlock,
        blockControl,
    };
};
