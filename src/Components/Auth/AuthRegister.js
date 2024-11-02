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
  const [add, setAdd] = useState(false);
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

  const onSubmitHandler = () => {
    registerUser(newUser.username, newUser.password, newUser.email)
    .then((createdUser) => {
        console.log('Created user: ', createdUser)
    });

    navigate('/')
  }

  useEffect(() => {
    if (newUser && add) {
      // TODO
      setAdd(false);
    }
  }, [newUser, add]);

  return (
    <div>
      <AuthForm user={newUser} onChange={onChangeHandler} onSubmit={onSubmitHandler} />
    </div>
  );
  
}
