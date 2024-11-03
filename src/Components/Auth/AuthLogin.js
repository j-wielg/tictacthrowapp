import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from './AuthForm';
import {loginUser} from '../../Services/AuthService'


/**
 * React component that allows a user to register
 * for the app.
 */
export default function AuthLogin() {
  const navigate = useNavigate();
  const [add, setAdd] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    e.preventDefault();
    const {name, value: newValue} = e.target;
    setUser({ ...user, [name]: newValue })
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    loginUser(user.username, user.password)
    .catch((error) => {
        alert(error.message);
    })
    .then((userObj) => {
        console.log('Logged in user: ', userObj)
    });
  }

  useEffect(() => {
    if (user && add) {
      // TODO
      setAdd(false);
    }
  }, [user, add]);

  return (
    <div>
      <h1>Log In</h1>
      <AuthForm user={user} onChange={onChangeHandler} onSubmit={onSubmitHandler} />
    </div>
  );
  
}
