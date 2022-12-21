import { Square } from "./square"

type RowProps = {
    rowNumber: number;
    children: React.ReactNode;
}

export function Row(props: RowProps){
     return (
        <div className="row">
            {
                props.children
            }
        </div>
    )
}
