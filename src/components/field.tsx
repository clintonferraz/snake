import { useEffect } from 'react'
import '../styles/field.sass'

type FieldProps = {

}

export function Field(props: FieldProps){

    useEffect(() => {
        let field = document.querySelector('.field') as HTMLElement;
        field.innerHTML = '';

        for (let j=0; j<20; j++){
            let row = document.createElement('div') as HTMLElement;
            row.classList.add('row');
            for(let i=0; i<20; i++){
                let square = document.createElement('div') as HTMLElement;
                square.classList.add('square');
                row.appendChild(square);
            }
            field.appendChild(row);
        }

      },[]);



    return(
        <div className='field'>
            {

            }
        </div>
    );
    
}
