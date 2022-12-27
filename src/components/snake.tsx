type SnakeProps = {
    initialHeadRow: number;
    initialHeadColumn: number;
    direction: number;
}

export enum Direction {
    Up,
    Down,
    Left,
    Right,
} 

export class Snake{
    private row:number;
    private column:number;
    public direction =  Direction.Right;

    public keepWalking = false;

    constructor(props: SnakeProps) {
        this.row=props.initialHeadRow;
        this.column=props.initialHeadColumn;
        this.direction = props.direction;
    }

    public get getRow(){
        return this.row;
    }

    public get getColumn(){
        return this.column;
    }

    public setHeadPosition(row:number, column:number) {
        this.row = row;
        this.column = column;
    }




}
