import React, {useState} from 'react';
import s from './RegistrationForm.module.css';
import {useForm} from "react-hook-form";
import Button from "../../Button/Button";
import cn from "classnames";

const RegistrationForm = ({addContact}) => {
    const [userInfo, setUserInfo] = useState({
        name: '',
        lastName: '',
        phone: ''
    });

    const { register, handleSubmit, formState: {errors} } = useForm({mode: 'onBlur'});

    console.log('formState', errors)

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     addContact(userInfo);
    //     setUserInfo({name: '',lastName: '',phone: ''});
    // }

    // const handleOnChange = (event) => {
    //     setUserInfo({...userInfo, [event.target.name]: event.target.value});
    // }

    const onSubmit = (data) => {
        console.log('data-->', data)
    }

  return (
      // <form className={s.form} onSubmit={handleSubmit}>
      <>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <h3>Регистрация</h3>
          <input
              {...register('name', {
                  required: true,
              })}
              type="text"
              // name="name"
              placeholder="Введите имя"
              // value={userInfo.name}
              // onChange={handleOnChange}
          />
          <input
              {...register('email')}
              type="text"
              // name="lastName"
              placeholder="Введите email"
              // value={userInfo.lastName}
              // onChange={handleOnChange}
          />
          <input
              {...register('password', {
                  pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                      message: 'Пароль должен содержать минимум восемь символов, одну букву латинского алфавита и одну цифру'
                  }
              })}
              className={cn(s.input, {
                  [s.inputError]: errors?.password,
              })}
              type="password"
              // name="phone"
              placeholder="Введите password"
              // value={userInfo.phone}
              // onChange={handleOnChange}
          />
          {errors && errors.password ? (
              <div>
                  <p className={s.errorMessage}>{errors.password.message}</p>
              </div>
          ):null}


          <Button>Зарегистрироваться</Button>
      </form>

      </>
  );
};

export default RegistrationForm;
