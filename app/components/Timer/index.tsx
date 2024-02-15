import { useEffect, useRef, useState } from "react";

type TimerProps = {
    executeFn: () => void;
};

export const Timer = (props: TimerProps) => {
    const [time, setTime] = useState<number>(3);
    const intervalRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        intervalRef.current = window.setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);
    }, []);

    useEffect(() => {
        if (time === -1 && intervalRef.current) {
            props.executeFn();
            window.clearInterval(intervalRef.current);
        }

        () => window.clearInterval(intervalRef.current);
    }, [time]);

    return <p>{time > 0 ? time : "Start!"}</p>;
};
