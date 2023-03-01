import { lazy, memo } from "react";

// hooks
import { useTetris } from "../../hooks/useTetris";

// component
import { Player } from "../Player";

// styled-component
import * as S from "./style";

// hooks
import { usePlayer } from "../../hooks/usePlayer";
import { Oppernent } from "../Opponent/indes";
import { withErrorBoundaryAndSuspense } from "../ErrorSuspense";
import { useSelector } from "react-redux";
import { gameState } from "../../store/reducer/gameState";

const ChatComponent = memo(
    withErrorBoundaryAndSuspense(
        lazy(() => import("chatModule/Chat")),
        <div>로딩중...</div>,
        (error, errorInfo) => {
            console.error("An error occurred in MyComponent", error, errorInfo);
        }
    )
);

export const Tetris = () => {
    const { render } = useTetris();
    const { nickName } = useSelector(gameState);
    const { players, randomSession, newSession } = usePlayer(render);

    return (
        <S.GameConatiner>
            <Oppernent players={players} />
            <Player
                players={players}
                render={render}
                randomSession={randomSession}
                newSession={newSession}
            />
            <ChatComponent nickName={nickName} />
        </S.GameConatiner>
    );
};
