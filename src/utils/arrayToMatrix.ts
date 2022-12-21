export function arrayToMatrix(arr: NodeListOf<Element>, width: number){
    var matrix: Element[][]  = [];
    for( let i = 0; i < Math.ceil(arr.length/width); i++){
        matrix[i] = [];
        for(let k = 0; k < width; k++){
            matrix[i][k] = arr[width*i+k];
        }
    }
    return matrix;
}