import React, { DependencyList, useEffect } from "react";

export const useKeyUp = (
    callback: (e: KeyboardEvent) => void,
    deps?: DependencyList
) => {
    useEffect(() => {
        window.addEventListener("keyup", callback);
        return () => window.removeEventListener("keyup", callback);
    }, deps);
};
