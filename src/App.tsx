// component
import { Tetris } from "./components/tetris";

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
            <Tetris />
        </div>
    );
}

export default App;
