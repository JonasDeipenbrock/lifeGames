import useCanvas from "../../hooks/useCanvas";

const GameOfLife = () => {
    const draw = (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(50, 100, 20, 0, 2 * Math.PI);
        ctx.fill();
    };

    const update = (ctx: CanvasRenderingContext2D) => {
        console.log("updating");
    };

    const canvasRef = useCanvas(draw, update);

    return (
        <>
            <div>Game of Life</div>
            <canvas
                ref={canvasRef}
                className="border-solid border-2 border-black"
            />
        </>
    );
};
export default GameOfLife;
