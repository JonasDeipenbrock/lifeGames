import { useRef } from "react";
import { World } from "../../gameOfLife/world";
import useCanvas from "../../hooks/useCanvas";

const GameOfLife = () => {
    const world = useRef<World>(new World(1000, 500));

    const draw = (ctx: CanvasRenderingContext2D) => {
        // ctx.fillStyle = "#000000";
        // ctx.beginPath();
        // ctx.arc(50, 100, 20, 0, 2 * Math.PI);
        // ctx.fill();
        world.current.draw(ctx);
        console.log("drawing finished");
    };

    const update = (ctx: CanvasRenderingContext2D) => {
        // console.log("updating");
    };

    const canvasRef = useCanvas(draw, update);
    3;
    return (
        <>
            <div>Game of Life</div>
            <canvas
                ref={canvasRef}
                width="1000"
                height="500"
                className="border-solid border-2 border-black"
            />
        </>
    );
};
export default GameOfLife;
