import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from './AuthForm';
import {loginUser} from '../../Services/AuthService'


/**
 * React component that allows a user to register
 * for the app.
 */
export default function AuthLogin() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [errorText, setErrorText] = useState("");

  const onChangeHandler = (e) => {
    e.preventDefault();
    const {name, value: newValue} = e.target;
    setUser({ ...user, [name]: newValue })
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    loginUser(user.username, user.password)
    .then((userObj) => {
        console.log('Logged in user: ', userObj);
        navigate('/');
    })
    .catch((error) => {
        setErrorText(error.message);
    })
  }

  return (
    <div>
      <h1>Log In</h1>
      {errorText ? (
        <div>
          <p>{errorText}</p>
        </div>
      ) : (
        <div></div>
      )}
      <AuthForm user={user} onChange={onChangeHandler} onSubmit={onSubmitHandler} />
    </div>
  );
  
}
