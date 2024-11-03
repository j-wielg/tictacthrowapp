import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from './AuthForm';
import {registerUser} from '../../Services/AuthService'


/**
 * React component that allows a user to register
 * for the app.
 */
export default function AuthRegister() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  const onChangeHandler = (e) => {
    e.preventDefault();
    const {name, value: newValue} = e.target;
    setNewUser({ ...newUser, [name]: newValue })
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    registerUser(newUser.username, newUser.password, newUser.email)
    .catch((error) => {
        alert(error.message);
    })
    .then((createdUser) => {
        console.log('Created user: ', createdUser)
        navigate('/');
    });
  }

  return (
    <div>
      <h1>Register</h1>
      <AuthForm user={newUser} onChange={onChangeHandler} onSubmit={onSubmitHandler} />
    </div>
  );
  
}
