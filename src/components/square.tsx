type SquareProps = {
    isOn: boolean;
    switch: () => void;
}

export function Square(props: SquareProps){
    return (
        <div className={ props.isOn ? "square on" : "square"} onClick={props.switch}>
        </div>
    )
}
