import Raect, { useMemo } from "react";

// hooks
import { useBlockState } from "../../hooks/useBlockState";

// component
import { Player } from "../Player";
import { MultiPlay } from "../MultiPlay";

// styled-component
import * as S from "./style";

// hooks
import { usePlayer } from "../../hooks/usePlayer";

export const Tetris = () => {
    const { renderBlock, blockControl } = useBlockState();
    const { players } = usePlayer(renderBlock);

    return (
        <S.GameConatiner>
            <MultiPlay players={players} />
            <Player
                players={players}
                render={renderBlock}
                controller={blockControl}
            />
        </S.GameConatiner>
    );
};
