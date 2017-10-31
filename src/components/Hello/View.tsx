import * as React from 'react';
import './index.css';

export interface Props {
    name: string;
    level?: number;
}

function Hello({ name, level = 1 }: Props) {
    if (level <= 0) {
        throw new Error('You could not has a level');
    }

    return (
        <div className="hello">
            <div className="greeting">
                Hello {name + getExecMarks(level)}
            </div>
        </div>
    );
}

export default Hello;



function getExecMarks(numChars: number) {
    return Array(numChars + 1).join('!');
}