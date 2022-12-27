import { useEffect, useRef, useState } from 'react'
import './styles/app.sass'
import { Field } from './components/field'
import { Row } from './components/row';
import { Square, SquareType } from './components/square';
import { Environment } from './environment';
import { switchElement } from './utils/switchElement';


enum Direction {
    Up,
    Down,
    Left,
    Right,
} 



function App() {
    const [fieldMatrix, setFieldMatrix] = useState<SquareType[][]>(Array(Environment.FIELD_SIZE).fill(SquareType.EmptySquare).map(() =>
        Array(Environment.FIELD_SIZE).fill(SquareType.EmptySquare))
    );

    const snake = useRef({
        size: 3,
        headColumn:3,
        headRow:1,
        tailColumn:1,
        tailRow:1,
        body:[{row:1, column:2}],
        direction: Direction.Right,
        isWalking: false
    }); 

    const interval = useRef(0);

    useEffect(() => {
        document.addEventListener('keydown', (event) => {
        
            switch (event.key) {
                case 'ArrowDown':
                    if (snake.current.direction != Direction.Up)
                        snake.current.direction = Direction.Down;
                    break;
                case 'ArrowLeft':
                    if (snake.current.direction != Direction.Right)
                        snake.current.direction = Direction.Left;
                    break;
                case 'ArrowRight':
                    if (snake.current.direction != Direction.Left)
                        snake.current.direction = Direction.Right;
                    break;
                case 'ArrowUp':
                    if (snake.current.direction != Direction.Down)
                        snake.current.direction = Direction.Up
                    break;
                case 's':
                    stop();
                    break;
                case ' ':
                    if(!snake.current.isWalking){
                        start();
                    } else stop();
                    break;
            }
        });

        switchSquareTo(SquareType.Food, 1, 15);
    },[]);
 
    function switchSquareTo(type: SquareType, row: number, column: number) {
        setFieldMatrix((prev) =>  switchElement(prev, row, column, type) );
    }

    function setSnakeHeadPosition(square: {row: number, column:number}){
        snake.current.headRow = square.row;
        snake.current.headColumn = square.column;
        
    }

    function setSnakeTailPosition(square: {row: number, column:number}){
        snake.current.tailRow = square.row;
        snake.current.tailColumn = square.column;
    }

    function nextSquare(){
        let nextSquare : {row: number, column: number};
        switch (snake.current.direction) {
            case Direction.Right:
                nextSquare = {row: snake.current.headRow, column: snake.current.headColumn + 1}
                break;
            case Direction.Down:
                nextSquare = {row: snake.current.headRow + 1, column: snake.current.headColumn}
                break;
            case Direction.Left:
                nextSquare = {row: snake.current.headRow, column: snake.current.headColumn - 1}
                break;        
            case Direction.Up:
                nextSquare = {row: snake.current.headRow - 1, column: snake.current.headColumn}
                break;  
        }
        return nextSquare;
    }

    function generateRandomFood(fieldMatrix: SquareType[][]){
        let randomRow, randomColumn;
        do{
            randomRow = Math.floor(Math.random() * Environment.FIELD_SIZE);
            randomColumn = Math.floor(Math.random() * Environment.FIELD_SIZE);
        }while(fieldMatrix[randomRow][randomColumn] != SquareType.EmptySquare);
 
        switchSquareTo(SquareType.Food, randomRow, randomColumn);
    }

    function walk1Step(){
       
        setFieldMatrix((prev) =>  {
            let nextSquareType = prev[nextSquare().row][nextSquare().column];
            let newMatrix;
            switch (nextSquareType) {
                case SquareType.EmptySquare:
                    snake.current.body.push({row: snake.current.headRow, column: snake.current.headColumn});
                    setSnakeHeadPosition(nextSquare());
                    newMatrix = switchElement(prev, snake.current.headRow, snake.current.headColumn, SquareType.Snake);
                    newMatrix = switchElement(newMatrix, snake.current.tailRow, snake.current.tailColumn, SquareType.EmptySquare);
                    setSnakeTailPosition(snake.current.body[0]);
                    snake.current.body.shift();  
                    return newMatrix;
                    break;
                case SquareType.Food:
                    snake.current.body.push({row: snake.current.headRow, column: snake.current.headColumn});
                    setSnakeHeadPosition(nextSquare());
                    newMatrix = switchElement(prev, snake.current.headRow, snake.current.headColumn, SquareType.Snake);
                    generateRandomFood(prev);
                    return newMatrix;
                    break;
                case SquareType.Snake:
                    stop();
                    alert('Você perdeu!');
                    return prev;
                    break;
                default:
                    stop();
                    alert('Você perdeu!');
                    return prev;
                    break;
            }
  
            
        } );

    }

    function start(){ 
        if(!snake.current.isWalking){
            snake.current.isWalking = true;
            interval.current = setInterval(walk1Step, Environment.SNAKE_SPEED);
        }   
    }

    function stop(){
        clearInterval(interval.current);
        snake.current.isWalking = false;
    }



    return (
        <div className="App">
            <Field>
                {
                    fieldMatrix.map((boolArray, row) => (
                        <Row key={row} rowNumber={row}>
                            {
                                boolArray.map((value, column) => (
                                    <Square key={column} type={value} />
                                ))
                            }
                        </Row>
                    ))
                }
            </ Field>
        </div>
    )
}

export default App
