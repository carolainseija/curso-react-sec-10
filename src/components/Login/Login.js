import React, { useState, useEffect, useReducer } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.valid.includes('@') };
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value, isValid: state.value.trim().length > 6
    };
  }
  return { value: '', isValid: false };
}

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 }
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value, isValid: state.value.trim().length > 6
    }
  }
  return { value: '', isValid }
}

const Login = (props) => {
  // con estados, useState()
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState(); 
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  //REDUCER(), parametros, que van en cada uno 
  //1- funcion inical que se ejecuta 
  //2 - estado inical
  //03- Una funcion para establecer el estado inicial.

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  })

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(()=> {
    const identifier = setTimeout(()=> {
      console.log('Checking form validaty"');
      setFormIsValid(emailState.isValid && passwordState.isValid )
    }, 500);
    return ()=> {
      console.log('CLEANUP');
      clearTimeout(identifier);
    }
  }, [emailState, passwordState ])

  // useEffect(() => {
  //   console.log("chekiando vabgngbliHGJJGGdaFFDHciónNNN..")
  //   setTimeout(() => {
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500)
  //   return () => {
  //     console.log("Clenaup")
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value })
    
    // setEnteredEmail(event.target.value);
    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid
    )
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6
    );
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
    setFormIsValid(
      passwordS.isValid && event.target.value.trim().length > 6
    );
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
