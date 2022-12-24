import { Component } from 'react'

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

export class Snake extends Component<SnakeProps>{
    private row:number;
    private column:number;
    public direction =  Direction.Right;

    public keepWalking = false;

    constructor(props: SnakeProps) {
        super(props)
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
