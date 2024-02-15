// component
import { Tetris } from "./components/tetris";
import { NickName } from "./components/NickName";

function App() {
    return (
        <div className="flex justify-center items-center w-screen h-screen gap-[20px] bg-[gray]">
            <NickName />
            <Tetris />
        </div>
    );
}

export default App;
