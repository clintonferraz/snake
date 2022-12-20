import '../styles/field.sass'
import { Row } from './row';


type FieldProps = {

}

export function Field(props: FieldProps){

    return(
        <div className='field'>
            {
                Array(20).fill(null).map((_value, index) => (
                        <Row key={index} rowNumber={index}/>
                ))
            }
        </div>
    );
    
}
