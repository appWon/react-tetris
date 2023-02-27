import { useEffect, useRef, useState } from "react";

type TimerProps = {
    executeFn: () => void;
};

export const Timer = (props: TimerProps) => {
    const [time, setTime] = useState<number>(3);
    const intervalRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);
    }, []);

    useEffect(() => {
        if (time === -1 && intervalRef.current) {
            props.executeFn();
            clearInterval(intervalRef.current);
        }

        () => clearInterval(intervalRef.current);
    }, [time]);

    return <p>{time > 0 ? time : "Start!"}</p>;
};
