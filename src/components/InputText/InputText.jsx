import React, {forwardRef} from 'react';
import s from './InputText.module.css';
import cn from "classnames";

const InputText = forwardRef((props, ref) => {
    const {type = 'text', errorText, placeholder, ...restProps} = props

    let input = null;
    if (type === 'text') {
        input = (
            <input className={cn(s.input, {
                [s.inputError]: errorText,
            })} ref={ref} placeholder={placeholder} {...restProps} />
        )
    } else if (type === 'textarea') {
        input = <textarea className={cn(s.input, s.textarea, {
            [s.inputError]: errorText
        })} placeholder={placeholder} {...restProps} />
    }
    return (
        <div>
            {input}
            {errorText ? (
                <div className={s.errorMessage}>{errorText}</div>
            ) : null}
        </div>
    );
});

export default InputText;
