export class World {
    /**
     * number of cells on y axis
     */
    private height: number;
    /**
     * number of cells on x axis
     */
    private width: number;
    private cellSize: number;
    private cells: Array<boolean>;
    private paused = true;

    /**
     *
     * @param width number of cells on x axis
     * @param height number of cells on y axis
     * @param cellSize size of a single cell
     */
    constructor(width: number, height: number, cellSize = 50) {
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;

        this.cells = new Array(this.width * this.height).fill(false);
    }

    updateOnce(forceUpdate = false) {
        if (this.paused && !forceUpdate) {
            return;
        }

        const nextGeneration = new Array(this.width * this.height).fill(false);

        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                //calculate living neighbours
                let livingNeighbours = 0;
                for (let xi = i - 1; xi <= i + 1; xi++) {
                    for (let xj = j - 1; xj <= j + 1; xj++) {
                        if (
                            xi < 0 ||
                            xj < 0 ||
                            xi >= this.width ||
                            xj >= this.height ||
                            (xi === i && xj === j)
                        ) {
                            continue;
                        }
                        const neighbourCell = this.cells[xi * this.width + xj];
                        if (neighbourCell) {
                            livingNeighbours++;
                        }
                    }
                }
                const cell = this.cells[i * this.width + j];

                //dead cell and exactly 3 living neighbours => make alive
                if (!cell && livingNeighbours === 3) {
                    nextGeneration[i * this.width + j] = true;
                    continue;
                }

                //alive and less than 2 living neighbours => make dead
                if (cell && livingNeighbours < 2) {
                    nextGeneration[i * this.width + j] = false;
                    continue;
                }

                //alive and more than 3 living neighbours => make dead
                if (cell && livingNeighbours > 3) {
                    nextGeneration[i * this.width + j] = false;
                    continue;
                }

                //alive and 2 or 3 living neighbours => stays alive
                if (cell) {
                    nextGeneration[i * this.width + j] = true;
                    continue;
                }
            }
        }

        this.cells = nextGeneration;
    }

    setCells() {
        this.cells = new Array(this.width * this.height).fill(false);
    }

    draw(ctx: CanvasRenderingContext2D) {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                const cell = this.cells[i * this.width + j];
                if (cell) {
                    ctx.fillStyle = '#ff0000';
                } else {
                    ctx.fillStyle = '#000000';
                }
                ctx.beginPath();
                ctx.arc(
                    i * this.cellSize + this.cellSize / 2,
                    j * this.cellSize + this.cellSize / 2,
                    this.cellSize / 2,
                    0,
                    2 * Math.PI
                );
                ctx.fill();
            }
        }
    }

    pause() {
        this.paused = true;
    }

    unpause() {
        this.paused = false;
    }

    setWidth(width: number) {
        this.width = width;
        //TODO copy array content over correctly
    }

    handleClick(event: MouseEvent) {
        console.log(event.x, event.clientX, event.offsetX);
        const x = Math.ceil(event.offsetX / this.cellSize) - 1;
        const y = Math.ceil(event.offsetY / this.cellSize) - 1;
        console.log(x, y);

        this.cells[x * this.width + y] = !this.cells[x * this.width + y];
        console.log(this.cells);
    }
}
