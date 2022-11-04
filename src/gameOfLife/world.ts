export class World {
    private height: number;
    private width: number;
    private cellSize = 50;
    private cells: Array<boolean>;
    private paused = true;

    constructor(width: number, height: number) {
        // this.width = width / this.cellSize;
        // this.height = height / this.cellSize;
        this.width = 7;
        this.height = 7;

        this.cells = new Array(
            // (height / this.cellSize - 2) * (width / this.cellSize)
            7 * 7
        ).fill(false);
    }

    updateOnce(forceUpdate = false) {
        if (this.paused && !forceUpdate) {
            return;
        }

        const nextGeneration = new Array(
            // (height / this.cellSize - 2) * (width / this.cellSize)
            7 * 7
        ).fill(false);

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
        this.cells = new Array(
            // (height / this.cellSize - 2) * (width / this.cellSize)
            7 * 7
        ).fill(false);

        // this.cells[0 * this.width + 0] = true;
        this.cells[0 * this.width + 1] = true;
        this.cells[1 * this.width + 2] = true;
        this.cells[2 * this.width + 0] = true;
        this.cells[2 * this.width + 1] = true;
        this.cells[2 * this.width + 2] = true;
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
                    20,
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
}
