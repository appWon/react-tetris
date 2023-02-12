import React, { useEffect } from "react";

// component
import { Tetris } from "./components/tetris";
import { NickName } from "./components/NickName";

function App() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "gray",
                width: "100vw",
                height: "100vh",
                gap: "20px",
            }}
        >
            <NickName />
            <Tetris />
        </div>
    );
}

export default App;
