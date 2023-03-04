import React from 'react';
import s from './Modal.module.css';
import cn from "classnames";

const Modal= ({active, setActive, children}) => {
    const handleClose = () => {
        setActive(false)
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
