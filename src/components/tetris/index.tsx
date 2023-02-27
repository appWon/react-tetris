// hooks
import { useTetris } from "../../hooks/useTetris";

// component
import { Player } from "../Player";

// styled-component
import * as S from "./style";

// hooks
import { usePlayer } from "../../hooks/usePlayer";
import { Oppernent } from "../Opponent/indes";

export const Tetris = () => {
    const { render } = useTetris();
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
        </S.GameConatiner>
    );
};
