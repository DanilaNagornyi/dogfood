import React from 'react';
import {useForm} from "react-hook-form";
import Button from "../../Button/Button";
import InputText from "../../InputText/InputText";
import s from './RegistrationForm.module.css';

const RegistrationForm = ({addContact, linkState}) => {
    const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onBlur'});

    const onSubmit = (data) => {
        console.log('data-->', data)
    }

    const emailRegister = register('email', {
        required: 'Обязательное поле',
        pattern: {
            value: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
            message: 'Не валидный email'
        }
    });

    const passwordRegister = register('password', {
        required: 'Обязательное поле',
        pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: 'Нужен пароль сложнее'
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
                errorText={errors.password?.message}
            />
            <p className={s.description}>Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой
                конфиденциальности и соглашаетесь
                на информационную рассылку.</p>
            <Button>Зарегистрироваться</Button>
            <Button href="/login" linkState={linkState} look="secondary" type="button">Войти</Button>
        </form>
    );
};

export default RegistrationForm;
