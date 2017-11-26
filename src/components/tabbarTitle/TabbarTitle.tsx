import * as React from "react";
import './index.css';

export interface TabbarTitleProps {
    title: string | React.ReactNode;
    buttons: any;
}

function TabbarTitle({ title, buttons }: TabbarTitleProps) {
    return (
        <div className='TabbarTitle-tabbar'>
            <h2 className='TabbarTitle-title'>{title}</h2>
            <div>
                {buttons}
            </div>
        </div>
    )
}

export default TabbarTitle;