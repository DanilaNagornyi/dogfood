import React, {useEffect, useState} from 'react';
import s from './Modal.module.css';
import cn from "classnames";
import {useLocation, useNavigate} from "react-router-dom";

const Modal = ({children}) => {
    const [active, setActive] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const initialPath = location.state?.initialPath;

    useEffect(() => {
        setActive(true);
    }, []);

    const handleClose = () => {
        setActive(false);
        navigate(initialPath ? initialPath : -1);
    }

    return (
        <div className={cn(s.modal, {
            [s.active]: active
        })} onClick={handleClose}>
            <div className={cn(s.modalContent, {
                [s.active]: active
            })} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
};

export default Modal;
