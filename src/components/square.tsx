type SquareProps = {
    row: number;
    column: number;
}

export function Square(props: SquareProps){
    function handleTurnSquareOn(){
        const toMatrix = (arr: NodeListOf<Element>, width: number) => {
            var matrix: Element[][]  = [];
            for( let i = 0; i < Math.ceil(arr.length/width); i++){
                matrix[i] = [];
                for(let k = 0; k < width; k++){
                    matrix[i][k] = arr[width*i+k];
                }
            }
            return matrix;
        }
        let squaresArray = document.querySelectorAll('.square');
        let squaresMatrix = toMatrix(squaresArray,20);
        let thisSquare = squaresMatrix[props.row][props.column];
        thisSquare.classList.add('on');
    }

    return (
        <div className="square" onClick={handleTurnSquareOn}>

        </div>
    )
}