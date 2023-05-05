import React, { useState,useEffect,useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  //const [enteredEmail, setEnteredEmail] = useState('');
  //const [emailIsValid, setEmailIsValid] = useState();

  const emailReducer = (state,action) =>{
    console.log('emailReduced triggered');

    if (action.type==='USER_INPUT'){
      return {value : action.val, isValid : action.val.includes('@')};
    }

    if (action.type==='INPUT_BLUR'){
      return {value:state.value,isValid:state.value.includes('@')};
    }

    return {value:'',isValid:false};

  };

  const passwordReducer = (state,action) =>{
    
    if (action.type==='USER_INPUT'){
      return {value : action.val, isValid : action.val.trim().length>6 };
    }

    if (action.type==='INPUT_BLUR'){
      return {value:state.value,isValid:state.value.length > 6 };
    }

    return {value:'',isValid:false};
  }


  const [emailState,dispatchEmail] =useReducer(emailReducer,{value:'',isValid:null}); 
  const [passwordState,dispatchPassword]=useReducer(passwordReducer,{value:'',isValid:null});

  //const {isValid : emailIsValid} = emailState;
  //const {isValid : passwordIsValid} = passwordState;

  //const [enteredPassword, setEnteredPassword] = useState('');
  //const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  
  useEffect(()=>{
    const identifier = setTimeout(()=>{
      console.log('Checking Validity');
      console.log('Email is valid :' + emailState.isValid);
      console.log('Password is valid : ' + passwordState.isValid);
      
      setFormIsValid(
        emailState.isValid && passwordState.isValid
      );
    },500);
   
    return () =>{
      clearTimeout(identifier);
    }
  },[emailState,passwordState]);


  const emailChangeHandler = (event) => {
    //setEnteredEmail(event.target.value);
    dispatchEmail({type:'USER_INPUT',val:event.target.value});
  };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);
    dispatchPassword({type:'USER_INPUT',val:event.target.value});
  };

  const validateEmailHandler = () => {
    //setEmailIsValid(enteredEmail.includes('@'));
    dispatchEmail({type:'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    ///setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type:'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
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
