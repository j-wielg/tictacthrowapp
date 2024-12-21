import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from './AuthForm';
import {registerUser} from '../../Services/AuthService'


/**
 * React component that allows a user to register
 * for the app.
 */
export default function AuthRegister() {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");
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
    .then((createdUser) => {
        console.log('Created user: ', createdUser)
        navigate('/');
    })
    .catch((error) => {
        setErrorText(error.message);
    });
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="max-w-lg w-full bg-white shadow-xl rounded-lg p-8 border border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Register</h1>
        {errorText && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded">
            <p>{errorText}</p>
          </div>
        )}
        <AuthForm user={newUser} onChange={onChangeHandler} onSubmit={onSubmitHandler} />
      </div>
    </div>
  );
}
