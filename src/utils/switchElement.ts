export function switchElement(matrix: boolean[][], x:number, y:number){
    let newMatrix = matrix.map((row, index1) => (
        row.map((value, index2) => 
            (index1==x && index2==y) ? !value : value
        )
    ));
    return newMatrix;
}