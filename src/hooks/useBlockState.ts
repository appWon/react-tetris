import { useState, useEffect, KeyboardEvent } from "react";

// 상수
import {
    ROW,
    INIT_POSITION,
    LEFT_OR_RIGHT,
    INIT_RENDER_ARR,
} from "../constants";

// helper 함수
import { check, getDropBlock, setRender } from "../helper";

// type
import { GameState } from "../types";
import { BlockType, RowWidth, LeftOrRight } from "../types";

export const useBlockState = (gameState: GameState, setGameState: any) => {
    const [renderBlock, setRenderBlock] = useState<BlockType[][]>([]);
    const [dropBlock, setDropBlock] = useState<BlockType[][]>([]);
    const [fixedBlock, setFixedBlock] = useState<BlockType[][]>([]);
    const [position, setPosition] = useState<RowWidth>(INIT_POSITION);

    /**
     * 처음 테트리스 타일 배열 초기화 Hook
     */
    useEffect(() => {
        fixToGrid(INIT_RENDER_ARR);
    }, [gameState]);

    /**
     * 테트리스 1초마다 y축 1씩 떨어트리는 Hook
     */
    useEffect(() => {
        if (gameState !== "playing") return;

        const interval = setInterval(() => {
            setMoveY();
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [gameState, position.y]);

    /**
     * position y 상태에 따른 hook
     * - 과정
     * 1. 떨어지는 블럭의 높이와 y값 비교 후 화면 렌더링
     * 2. renderToGrid() 함수를 통해 y축이 증가 되었을 경우 상태 확인 후 중복이 있다면 증가 되기전 renderArr를 테트리스 렌더링 타일로 등록
     * 3. 증복 블럭이 없다면 테트리스 렌더링 타일로 등록
     */
    useEffect(() => {
        const blockHeight = dropBlock[0]?.length || 0;

        if (position.y + blockHeight > ROW) {
            fixToGrid(renderBlock);
            return;
        }

        const renderArr =
            gameState === "end" ? endGame() : renderToGrid(position);

        if (!check(renderArr)) {
            if (position.y === 0) {
                setGameState("end");
            } else {
                fixToGrid(renderBlock);
            }
        }

        setRenderBlock(renderArr);
    }, [position, dropBlock, fixedBlock]);

    /**
     * 떨어지는 블록 좌우 이동시 실행 함수
     * -과정
     * 1. 떨어지는 블록과 x축 계산 후 테트리스 타일을 벗어 났을 경우 함수 종료
     * 2. 떨어지는 블록과 x축 계산 후 중복 블록이 있다면 함수 종료
     * 3. 1~2번 항목에 대해 해당사항이 없다면 x축 state 등록 및 화면 렌더링
     */
    const setMoveX = (rightOrLeft: LeftOrRight): void => {
        if (
            position.x + rightOrLeft + dropBlock.length >= 13 ||
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

        setPosition((prev) => ({ ...prev, x: rightOrLeft + prev.x }));
    };

    /**
     * 떨어지는 블록 회전하는 함수
     */
    const setRotateDropBlock = (): void => {
        const { x, y } = position;

        if (dropBlock.length <= 2 && x + dropBlock.length === 12) {
            if (dropBlock.length === 2) {
                setPosition({ y, x: x - 1 });
            } else {
                setPosition({ y, x: x - 3 });
            }
        }

        const roateBLock90 = dropBlock[0].map((_, index) =>
            dropBlock.map((row) => row[index]).reverse()
        );

        setDropBlock(roateBLock90);
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
        const copyBorder = JSON.parse(JSON.stringify(fixedBlock));

        const filterBlock = dropBlock.filter((arr) =>
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
                borderValue.color = filterBlock[column][row].color;
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
        const render = setRender(renderArr);

        if (gameState === "playing") {
            setDropBlock(getDropBlock());
        }

        setPosition(INIT_POSITION);
        setFixedBlock(render);
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
            position.x + dropBlock.length
        );
        const findDropBlockArr: number[] = dropBlock.map((row) => {
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
            row.map<BlockType>(({ state }) => ({
                color: state === "blank" ? "black" : "gray",
                state: "end",
            }))
        );

        return endGameRenderArr;
    };

    /**
     * 테트리스 아래로 한칸 움직이는 함수
     */
    const setMoveY = (): void => {
        setPosition(({ x, y }) => ({ x, y: y + 1 }));
    };

    /**
     * 키 입력 함수
     */
    const blockControl = ({ code }: KeyboardEvent<HTMLDivElement>) => {
        if (gameState !== "playing") return;

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
