import React, { Component } from 'react';

type BoardProps = {
    text: string;
}

export class Board extends Component<BoardProps> {
    board: HTMLElement;
    

    constructor(props: BoardProps) {
        super(props);
        this.board = document.querySelector('.board') as HTMLElement;
        
        
    }

    render(): React.ReactNode {
            return(
                <div className='board'>
                    

                </div>
            )
    }
}
