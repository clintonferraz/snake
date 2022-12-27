import { useEffect, useState } from 'react'
import './styles/app.sass'
import { Field } from './components/field'
import { Row } from './components/row';
import { Square } from './components/square';
import { Environment } from './environment';
import { switchElement } from './utils/switchElement';
import { Snake } from './components/snake';
import { Direction } from './components/snake';



function App() {
    const [boolMatrix, setBoolMatrix] = useState<boolean[][]>(Array(Environment.FIELD_SIZE).fill(false).map(() =>
        Array(Environment.FIELD_SIZE).fill(false))
    );

    const [ snake, setSnake ] = useState(new Snake({
        initialHeadColumn:1,
        initialHeadRow:1,
        direction: Direction.Right
    })); 



    useEffect(() => {
        document.addEventListener('keydown', (event) => {
        
            switch (event.key) {
                case 'ArrowDown':
                    if (snake.direction != Direction.Up)
                    snake.direction = Direction.Down;
                    break;
                case 'ArrowLeft':
                    if (snake.direction != Direction.Right)
                    snake.direction = Direction.Left;
                    break;
                case 'ArrowRight':
                    if (snake.direction != Direction.Left)
                    snake.direction = Direction.Right;
                    break;
                case 'ArrowUp':
                    if (snake.direction != Direction.Down)
                    snake.direction = Direction.Up;
                    break;
                case ' ':
                    if(!snake.keepWalking){
                        start();
                    } else stop();
                    break;

            }
        });



    },[]);

    useEffect(()=>{
    
        let a = snake.keepWalking ? setInterval(walk1Step,100) : undefined;

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
        snake.setHeadPosition(row,column);
        switchSquareTo(true,row,column);
    }

    function walk1Step(){
        switch (snake.direction) {
            case Direction.Right:
                setSnakeHeadPosition(snake.getRow, snake.getColumn + 1);
                break;
            case Direction.Down:
                setSnakeHeadPosition(snake.getRow + 1, snake.getColumn);
                break;
            case Direction.Left:
                setSnakeHeadPosition(snake.getRow, snake.getColumn - 1);
                break;        
            case Direction.Up:
                setSnakeHeadPosition(snake.getRow - 1, snake.getColumn);
                break;  
        }
    }

    function start(){
        if(!snake.keepWalking){
            console.log('start');
            snake.keepWalking = true; 
            walk1Step();
        }
    }

    function stop(){
        snake.keepWalking = false;
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
            <button onClick={() => start()}>Teste</button>
            <button onClick={() => snake.keepWalking = false}>Teste</button>

          

           
        

        </div>
    )
}

export default App
