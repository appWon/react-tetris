import { DependencyList, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// constance
import { DROP_LEVEL_FRAME } from "../constants";

// store
import { gameState, setTimeFrame } from "../store/reducer/gameState";

export const useInterval = (callback: () => void, deps: DependencyList) => {
    const dispatch = useDispatch();

    const { isPlaying, timeFrame } = useSelector(gameState);

    useEffect(() => {
        if (isPlaying !== "playing") return;

        const interval = setInterval(() => {
            callback();
        }, DROP_LEVEL_FRAME[timeFrame] * 16.67);

        return () => clearInterval(interval);
    }, deps);

    useEffect(() => {
        if (isPlaying !== "playing") return;

        const interval = setInterval(() => {
            if (timeFrame > 11) return;

            dispatch(setTimeFrame(timeFrame + 1));
        }, 20000);

        return () => clearInterval(interval);
    }, [isPlaying, timeFrame]);
};
