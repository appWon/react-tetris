import { useState, KeyboardEvent, useEffect, useRef } from "react";
import { INIT_RENDER_ARR, LEFT_OR_RIGHT } from "../../constants";

// hooks
import { useBlockState } from "../../hooks/useBlockState";
import { usePlayer } from "../../hooks/usePlayer";

// component
import { Button } from "../Button";
import { Border } from "../border";

// styled-component
import * as S from "./style";

//types
import { GameState } from "../../types";

export const Tetris = () => {
    const [gameState, setGameState] = useState<GameState>("stop");

    const { renderBlock, blockControl } = useBlockState(
        gameState,
        setGameState
    );
    const { players } = usePlayer(renderBlock);

    const handleClickGameStart = () => {
        setGameState("playing");
    };

    return (
        <S.GameConatiner>
            {Object.keys(players).map((v, i) => (
                <S.BlockBoardContainer key={i}>
                    <div>
                        <Border render={players[v]} size={1} />
                    </div>
                </S.BlockBoardContainer>
            ))}
            <S.BlockBoardContainer tabIndex={0} onKeyUp={blockControl}>
                <div>
                    <Border render={renderBlock} />
                </div>
                {gameState !== "playing" && (
                    <Button
                        onClick={handleClickGameStart}
                        gameState={gameState}
                    />
                )}
            </S.BlockBoardContainer>
        </S.GameConatiner>
    );
};
