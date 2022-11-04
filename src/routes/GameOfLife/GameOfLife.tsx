import { useRef, useState } from 'react';
import { World } from '../../gameOfLife/world';
import useCanvas from '../../hooks/useCanvas';

const GameOfLife = () => {
    const world = useRef<World>(new World(1000, 500));

    const draw = (ctx: CanvasRenderingContext2D) => {
        // ctx.fillStyle = "#000000";
        // ctx.beginPath();
        // ctx.arc(50, 100, 20, 0, 2 * Math.PI);
        // ctx.fill();
        world.current.draw(ctx);
    };

    const update = (ctx: CanvasRenderingContext2D) => {
        world.current.updateOnce();
    };
    const canvasRef = useCanvas(draw, update);

    const updateOnce = () => {
        world.current.updateOnce(true);
    };

    const setCells = () => {
        world.current.setCells();
    };

    const pause = () => {
        world.current.pause();
    };

    const unpause = () => {
        world.current.unpause();
    };

    return (
        <>
            <div>Game of Life</div>
            <canvas
                ref={canvasRef}
                width='1000'
                height='500'
                className='border-solid border-2 border-black'
            />
            <button onClick={updateOnce} className='px-5'>
                Update once
            </button>
            <button onClick={setCells} className='px-5'>
                Reset cells
            </button>
            <button className='px-5' onClick={unpause}>
                Start
            </button>
            <button className='px-5' onClick={pause}>
                Stop
            </button>
        </>
    );
};
export default GameOfLife;
