export class World {
    private height: number;
    private width: number;
    private cellSize = 50;
    private cells: Array<boolean>;

    constructor(width: number, height: number) {
        this.width = width / this.cellSize;
        this.height = height / this.cellSize;

        this.cells = new Array(height * width).fill(false);
    }

    draw(ctx: CanvasRenderingContext2D) {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                ctx.fillStyle = "#000000";
                ctx.beginPath();
                ctx.arc(
                    i * this.cellSize + this.cellSize / 2,
                    j * this.cellSize + this.cellSize / 2,
                    20,
                    0,
                    2 * Math.PI
                );
                ctx.fill();
                console.log(i, j);
            }
        }
    }
}
