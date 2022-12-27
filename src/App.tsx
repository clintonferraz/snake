import { useEffect, useRef, useState } from 'react'
import './styles/app.sass'
import { Field } from './components/field'
import { Row } from './components/row';
import { Square } from './components/square';
import { Environment } from './environment';
import { switchElement } from './utils/switchElement';


enum Direction {
    Up,
    Down,
    Left,
    Right,
} 

enum SquareType {
    Wall,
    EmptyField,
    SnakeBody,
    Food
}

function App() {
    const [boolMatrix, setBoolMatrix] = useState<boolean[][]>(Array(Environment.FIELD_SIZE).fill(false).map(() =>
        Array(Environment.FIELD_SIZE).fill(false))
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
                case ' ':
                    if(!snake.current.isWalking){
                        start();
                    } else stop();
                    break;
            }
        });



    },[]);

    useEffect(()=>{
    
        let a = snake.current.isWalking ? setInterval(walk1Step, 40) : undefined;

        return () => {
            clearInterval(a);
        }

    })
 

    function switchSquare(row: number, column: number) {
        setBoolMatrix((prev) =>  switchElement(prev, row, column));
    }

    function switchSquareTo(state: boolean, row: number, column: number) {
        setBoolMatrix((prev) =>  state != prev[row][column] ? switchElement(prev, row, column) : prev);
    }

    function setSnakeHeadPosition(row:number, column:number){
        snake.current.headRow = row;
        snake.current.headColumn = column;
        switchSquareTo(true,row,column);
    }

    function setSnakeTailPosition(){
        switchSquareTo(false, snake.current.tailRow, snake.current.tailColumn);
        snake.current.tailRow = snake.current.body[0].row;
        snake.current.tailColumn = snake.current.body[0].column;
        snake.current.body.shift();
        
    }

    function walk1Step(){
        snake.current.body.push({row: snake.current.headRow, column: snake.current.headColumn}) 
        switch (snake.current.direction) {
            case Direction.Right:
                setSnakeHeadPosition(snake.current.headRow, snake.current.headColumn + 1);
                break;
            case Direction.Down:
                setSnakeHeadPosition(snake.current.headRow+ 1, snake.current.headColumn);
                break;
            case Direction.Left:
                setSnakeHeadPosition(snake.current.headRow, snake.current.headColumn - 1);
                break;        
            case Direction.Up:
                setSnakeHeadPosition(snake.current.headRow - 1, snake.current.headColumn);
                break;  
        }
        setSnakeTailPosition();
    }

    function start(){ 
        if(!snake.current.isWalking){
            console.log('start');
            snake.current.isWalking = true;
            walk1Step();
        }
    }

    function stop(){
        snake.current.isWalking = false;
    }



    return (
        <div className="App">
            <Field>
                {
                    boolMatrix.map((boolArray, row) => (
                        <Row key={row} rowNumber={row}>
                            {
                                boolArray.map((value, column) => (
                                    <Square key={column} isOn={value} switch={() => switchSquare(row, column)} />
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
