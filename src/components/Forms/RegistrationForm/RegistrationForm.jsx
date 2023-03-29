import React from 'react';
import {useForm} from "react-hook-form";
import Button from "../../Button/Button";
import InputText from "../../InputText/InputText";
import s from './RegistrationForm.module.css';
import {REGEXP_EMAIL, REGEXP_GROUP, REGEXP_PASSWORD, VALIDATE_MESSAGE} from "../../../utils/constants";
import {useDispatch, useSelector} from "react-redux";
import {registrationThunk} from "../../../redux/redux-thunk/user-thunk/registrationThunk";

const RegistrationForm = ({addContact, linkState}) => {
    const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onBlur'});
    const {error: errorRedux} = useSelector(state => state.user);
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        console.log('data-->', data)
        dispatch(registrationThunk(data));
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

    const groupRegister = register('group', {
        required: VALIDATE_MESSAGE.requiredMessage,
        pattern: {
            value: REGEXP_GROUP,
            message: VALIDATE_MESSAGE.groupMessage
        }
    });

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <h3 className={s.title}>Регистрация</h3>
            <InputText
                {...emailRegister}
                placeholder="Ваш email"
                errorText={errors.email?.message}
            />
            <InputText
                {...passwordRegister}
                placeholder="Ваш пароль"
                // type="password"
                errorText={errors.password?.message}
            />
            <InputText
                {...groupRegister}
                placeholder="Укажите вашу группу"
                errorText={errors.group?.message}
            />
            <p className={s.description}>Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой
                конфиденциальности и соглашаетесь
                на информационную рассылку.</p>
            {errorRedux ? (
                <p className={s.errorMessage}>{errorRedux.message}</p>
            ) : null}
            <Button>Зарегистрироваться</Button>
            <Button href="/login" linkState={linkState} look="secondary" type="button">Войти</Button>
        </form>
    );
};

export default RegistrationForm;
