import { useEffect, useRef, useState } from 'react';
import { World } from '../../gameOfLife/world';
import useCanvas from '../../hooks/useCanvas';

const GameOfLife = () => {
    const [width, setWidth] = useState(20);
    const [height, setHeight] = useState(15);
    const [cellSize, setCellSize] = useState(50);

    const world = useRef<World>(new World(width, height));

    const draw = (ctx: CanvasRenderingContext2D) => {
        world.current.draw(ctx);
    };

    const update = (ctx: CanvasRenderingContext2D) => {
        world.current.updateOnce();
    };

    const onClickListener = (event: MouseEvent) => {
        world.current.handleClick(event);
    };

    const canvasRef = useCanvas(draw, update);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas?.addEventListener('click', onClickListener);

        return () => {
            window.removeEventListener('click', onClickListener);
        };
    }, []);

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

    const increaseWidth = () => {
        setWidth(width + 1);
        world.current.setWidth(width + 1);
    };

    return (
        <>
            <div>Game of Life</div>
            <canvas
                ref={canvasRef}
                width={width * cellSize}
                height={height * cellSize}
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
            <button className='px-5' onClick={increaseWidth}>
                Increase Width
            </button>
        </>
    );
};
export default GameOfLife;
