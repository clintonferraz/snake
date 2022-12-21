import { useEffect, useState } from 'react';
import '../styles/field.sass'
import { Row } from './row';




type FieldProps = {
    children: React.ReactNode;
}


export function Field(props: FieldProps){
    

    return(
        <div className='field'>
            {
                props.children
            }
        </div>
    );
    
}
