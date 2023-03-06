import s from './Button.module.css';
import cn from 'classnames';
import React from 'react';
import {Link} from "react-router-dom";

const Button = ({look = 'primary', children, onClick, href, className, linkState, ...restProps}) => {
    if (href) {
        return (
            <Link to={href} className={cn(s.button, className, {
                [s.primary]: look === 'primary',
                [s.secondary]: look === 'secondary',
            })} state={linkState} {...restProps}>{children}</Link>
        )
    }

    return (
        <button className={cn(s.button, className, {
            [s.primary]: look === 'primary',
            [s.secondary]: look === 'secondary',
        })} onClick={onClick} {...restProps}>
            {children}
        </button>
    )
};

export default Button;
