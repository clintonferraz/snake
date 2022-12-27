export enum SquareType {
    Wall,
    EmptySquare,
    Snake,
    Food
}

type SquareProps = {
    type: SquareType;
}

export function Square(props: SquareProps){
    return (
        <div className={ (props.type == SquareType.Snake || props.type == SquareType.Food)  ? "square on" : "square"}>
        </div>
    )
}
