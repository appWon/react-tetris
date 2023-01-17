import { useState, useEffect, useCallback, useMemo } from "react";

import { INIT_BLOCK_CENTER } from "../../constants";

// hooks
import { useBlockState } from "../../hooks/useBlockState";

// component
import { Cell } from "../Cell";

// styled-component
import * as S from "./blockBoard";

export const BlockBoard = () => {
    const [position, setPosition] = useState({ x: INIT_BLOCK_CENTER, y: 0 });
    const [renderBlock, currentBLock, floorBlock, setBlock] =
        useBlockState(position);

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition((positionValue) => {
                return { ...positionValue, y: positionValue.y + 1 };
            });
        }, 1000);

        if (currentBLock.length + position.y >= 24) {
            setBlock();
            setPosition({ x: 5, y: 0 });
            return;
        }

        if (currentBLock.length > 0)
            for (let row = currentBLock.length - 1; row >= 0; row--) {
                for (
                    let column = 0;
                    column < currentBLock[row].length;
                    column++
                ) {
                    const sumRow = row + position.x;
                    const sumColumn = column + position.y;
                    if (
                        currentBLock[row][column].type === "dropBlock" &&
                        renderBlock()[sumRow + 1][sumColumn + 1].type ===
                            "blank"
                    ) {
                        setBlock();
                        setPosition({ x: 5, y: 0 });
                    }
                }
            }

        return () => {
            clearInterval(interval);
        };
    }, [floorBlock, position]);

    return (
        <S.BlockBoardContainer>
            {renderBlock().map((v, columnCnt) => (
                <S.RowCoinatiner key={`column_${columnCnt}`}>
                    {v.map((v, rowCnt) => (
                        <Cell key={`row_${rowCnt}`}>{v.type}</Cell>
                    ))}
                </S.RowCoinatiner>
            ))}
        </S.BlockBoardContainer>
    );
};
