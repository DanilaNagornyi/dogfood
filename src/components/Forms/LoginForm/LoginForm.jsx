import React from 'react';
import s from "../RegistrationForm/RegistrationForm.module.css";
import cn from "classnames";
import Button from "../../Button/Button";
import {useForm} from "react-hook-form";
import InputText from "../../InputText/InputText";
import {Link} from "react-router-dom";
import {REGEXP_EMAIL, REGEXP_PASSWORD, VALIDATE_MESSAGE} from "../../../utils/constants";
import {useDispatch, useSelector} from "react-redux";
import {loginThunk} from "../../../redux/redux-thunk/user-thunk/loginThunk";

const LoginForm = ({linkState}) => {
    const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onBlur'});
    const {error: errorRedux} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const onSubmit = (data) => {
        console.log('data-->', data);
        dispatch(loginThunk(data));
    }

    const emailRegister = register('email', {
        required: VALIDATE_MESSAGE.requiredMessage,
        pattern: {
            value: REGEXP_EMAIL,
            message: VALIDATE_MESSAGE.emailMessage
        }
    });

    const passwordRegister = register('password', {
        required: VALIDATE_MESSAGE.requiredMessage,
        pattern: {
            value: REGEXP_PASSWORD,
            message: VALIDATE_MESSAGE.passwordMessage
        }
    });

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <h3 className={s.title}>Вход</h3>
            <InputText
                {...emailRegister}
                placeholder="Ваш email"
                errorText={errors.email?.message}
            />
            <InputText
                {...passwordRegister}
                placeholder="Ваш пароль"
                errorText={errors.password?.message}
            />
            <Link
                to="/reset-password"
                className={cn(s.description, s.resetPassword)}
                state={linkState}
            >Восстановить пароль</Link>
            {errorRedux ? (
                <p className={s.errorMessage}>{errorRedux.message}</p>
            ) : null}
            <Button>Войти</Button>
            <Button href="/registration"
                    linkState={linkState}
                    look="secondary"
                    type="button"
            >
                Зарегистрироваться
            </Button>
        </form>
    );
};

export default LoginForm;
