import React, { useState } from "react";
import SignupFormPage from "../SignupFormPage";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";

const SplashPage = () => {
    const [signUp, setSignUp] = useState(false)
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory()
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .then(() => history.push('/'))
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    };

    const handleDefaultButton = (e) => {

        const credential = 'Demo-lition'
        const password = 'password'

       return dispatch(sessionActions.login({ credential, password }))
            .then(() => history.push('/'))
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    }


    return (
        <div id='main'>
            <div>
                <p >Log in</p>
                <button onClick={() => setSignUp(true)}>Sign up</button>
                {!signUp &&
                    <>
                    <form  onSubmit={(e) => handleSubmit(e)}>
                        {errors.map((error, idx) => (
                            <li class='error-li' key={idx}>{error}</li>
                        ))}
                        <input  onChange={(e) => setCredential(e.target.value)} value={credential}  placeholder="Email or Username" required></input>
                        <input value={password}
                            onChange={(e) => setPassword(e.target.value)}  placeholder="Password" type='password' required></input>
                        <button  >Log In</button>
                    </form>
                    <button  onClick={(e)=> handleDefaultButton(e)}>Log In With Demo User</button>
                    </>
                }
                {signUp &&
                    <>
                        <SignupFormPage />
                        <button  onClick={() => setSignUp(false)}>Cancel Sign Up</button>
                    </>
                }

            </div>
        </div>
    )
}


export default SplashPage