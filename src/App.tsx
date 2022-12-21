import { useState } from 'react'
import './styles/app.sass'
import { Field } from './components/field'
import { Row } from './components/row';
import { Square } from './components/square';
import { Environment } from './environment';
import { switchElement } from './utils/switchElement';



function App() {
  const [boolMatrix , setBoolMatrix] = useState<boolean[][]>(Array(Environment.FIELD_SIZE).fill(false).map(() => 
    Array(Environment.FIELD_SIZE).fill(false))
  );

  function switchSquare(row: number, column: number){
    let newMatrix = switchElement(boolMatrix,row,column);
    setBoolMatrix(newMatrix);
  }

  function switchSquareTo(state: boolean,row: number, column: number){
    if(state != boolMatrix[row][column]){
      let newMatrix = switchElement(boolMatrix,row,column);
      setBoolMatrix(newMatrix);
    }
  }



  const handleClick = () => {
    switchSquare(7,8)

  };

  return (
    <div className="App">
      <Field>
        {
          boolMatrix.map((boolArray, row) => (
            <Row key={row} rowNumber={row}> 
              {
                boolArray.map((value, column) => (
                  <Square key={column} isOn={value} switch={() => switchSquare(row,column)}/>
                ))
              }
            </Row>
          ))
        }
      </ Field>

      <button onClick={handleClick}>Teste</button>
      
    </div>
  )
}

export default App
