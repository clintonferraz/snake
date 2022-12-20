import { Square } from "./square"

type RowProps = {
    rowNumber: number;
}

export function Row(props: RowProps){
    
    

    return (
        <div className="row">
            {
                Array(20).fill(null).map((_value, index) => (
                    <Square key={index} row={props.rowNumber} column={index}/>
                ))
            }
            
        </div>
    )
}