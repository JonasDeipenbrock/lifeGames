import { useEffect, useRef } from "react";

const useCanvas = (
    draw: (ctx: CanvasRenderingContext2D) => void,
    update: (ctx: CanvasRenderingContext2D) => void
) => {
    const canvasRef = useRef(null);

    const resizeCanvasToDisplaySize = (
        context: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement
    ) => {
        const { width, height } = canvas.getBoundingClientRect();

        if (canvas.width !== width || canvas.height !== height) {
            const { devicePixelRatio: ratio = 1 } = window;
            canvas.width = width * ratio;
            canvas.height = height * ratio;
            context.scale(ratio, ratio);
            return true;
        }

        return false;
    };

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

    const innerUpdate = (
        context: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement
    ) => {
        update(context);

        predraw(context, canvas);
        draw(context);
        postdraw(context);
    };

    useEffect(() => {
        const canvas = canvasRef.current as any as HTMLCanvasElement;
        const context = canvas.getContext("2d")!;
        const deltaTime = 1 / 2;

        let animationFrameId: number;
        let last: number;
        let accumulatedTime = 0;

        const render = (now: number) => {
            if (last) {
                accumulatedTime += (now - last) / 1000;

                if (accumulatedTime > deltaTime) {
                    accumulatedTime = 1;
                }

                while (accumulatedTime > deltaTime) {
                    innerUpdate(context, canvas);
                    accumulatedTime -= deltaTime;
                }
            }
            last = now;
            animationFrameId = window.requestAnimationFrame(render);
        };
        window.requestAnimationFrame(render);

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [draw]);

    return canvasRef;
};
export default useCanvas;
