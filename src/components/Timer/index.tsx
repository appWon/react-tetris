import React, {
    Dispatch,
    ReactNode,
    SetStateAction,
    useEffect,
    useState,
} from "react";

type TimerProps = {
    trigger: boolean;
    children: ReactNode;
    onSetTrigger: Dispatch<SetStateAction<boolean>>;
    executeFn: () => void;
};

export const Timer = (props: TimerProps) => {
    const [text, setText] = useState<string | number>("");

    useEffect(() => {
        if (!props.trigger) return;

        setText(3);
    }, [props.trigger]);

    useEffect(() => {
        if (!text) return;

        const timer = setTimeout(() => {
            if (text === 1) setText("go");
            else if (typeof text === "number") setText(text - 1);
            else {
                setText("");
                props.executeFn();
                props.onSetTrigger(false);
            }
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [text]);

    return (
        <>
            <p> {text || props.children}</p>
        </>
    );
};
