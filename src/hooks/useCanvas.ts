import { useEffect, useRef } from "react";

const useCanvas = (
    render: (ctx: CanvasRenderingContext2D) => void,
    update: (ctx: CanvasRenderingContext2D) => void
) => {
    const canvasRef = useRef(null);

    // const resizeCanvasToDisplaySize = (
    //     context: CanvasRenderingContext2D,
    //     canvas: HTMLCanvasElement
    // ) => {
    //     const { width, height } = canvas.getBoundingClientRect();

    //     if (canvas.width !== width || canvas.height !== height) {
    //         const { devicePixelRatio: ratio = 1 } = window;
    //         canvas.width = width * ratio;
    //         canvas.height = height * ratio;
    //         context.scale(ratio, ratio);
    //         return true;
    //     }

    //     return false;
    // };

    const predraw = (
        context: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement
    ) => {
        context.save();
        // resizeCanvasToDisplaySize(context, canvas);
        const { width, height } = context.canvas;
        context.clearRect(0, 0, width, height);
    };

    const postdraw = (context: CanvasRenderingContext2D) => {
        context.restore();
    };

    const innerRender = (
        context: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement
    ) => {
        predraw(context, canvas);
        render(context);
        postdraw(context);
    };

    useEffect(() => {
        const canvas = canvasRef.current as any as HTMLCanvasElement;
        const context = canvas.getContext("2d")!;

        let animationFrameId: number;

        let currentFrameTime = 0;
        const frameRate = 2;
        const frameDelta = 1000 / frameRate;

        const mainLoop = (time: number) => {
            //decouple updates from actual rendering
            while (currentFrameTime < time) {
                update(context);
                currentFrameTime += frameDelta;
            }
            innerRender(context, canvas);
            animationFrameId = window.requestAnimationFrame(mainLoop);
        };
        mainLoop(0);

        // let last: number;
        // let accumulatedTime = 0;

        // const render = (now: number) => {
        //     if (last) {
        //         accumulatedTime += (now - last) / 1000;

        //         if (accumulatedTime > deltaTime) {
        //             accumulatedTime = 1;
        //         }

        //         while (accumulatedTime > deltaTime) {
        //             innerUpdate(context, canvas);
        //             accumulatedTime -= deltaTime;
        //         }
        //     }
        //     last = now;
        //     animationFrameId = window.requestAnimationFrame(render);
        // };
        // window.requestAnimationFrame(render);

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [render]);

    return canvasRef;
};
export default useCanvas;
