export class Grid {
    width: number;
    height: number;
    cells: Array<boolean>;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.cells = new Array<boolean>(width * height).fill(false);
    }
}
