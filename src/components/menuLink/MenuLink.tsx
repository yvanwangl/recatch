import * as React from "react";
import {NavLink} from 'react-router-dom';

export interface MenuLinkProps {
    to: string | object;
    linkText: string;
}

function MenuLink({ to, linkText }: MenuLinkProps) {
    return <NavLink
                to={to}
                style={{
                    display: 'block',
                    textDecoration: 'none',
                    color: 'rgb(0,0,0)'
                }}
            >
                {linkText}
            </NavLink>
}

export default MenuLink;