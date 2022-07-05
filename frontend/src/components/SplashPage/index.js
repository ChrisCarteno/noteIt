import React, { useState } from "react";
import SignupFormPage from "../SignupFormPage";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import './splash.css'
import logo from "./logo.png"

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
        <div>        
            <img src = {logo}  alt="logoImage" width="300px"/>
            {!signUp &&
                <div className="box">
                <h2>Have an Account?</h2>
                <form  onSubmit={(e) => handleSubmit(e)}>
                    {errors.map((error, idx) => (
                        <li class='error-li' key={idx}>{error}</li>
                    ))}
                <input  className="email" onChange={(e) => setCredential(e.target.value)} value={credential}  placeholder="Email or Username" required></input>
                <input value={password} className="email"
                    onChange={(e) => setPassword(e.target.value)}  placeholder="Password" type='password' required></input>
                    <br></br>
                <button  className="btn3">Log In</button>
                </form>
                <br></br>
                <p> Sign up or try our Demo</p>
                <button className="btn"  onClick={(e)=> handleDefaultButton(e)}>DemoLogin</button>
                <button id="btn2" onClick={() => setSignUp(true)}>Sign up</button>
                </div>
            }
            
            {signUp &&
            <div className="box2">
                <SignupFormPage />
                <button className="btn5" onClick={() => setSignUp(false)}>Cancel Sign Up</button>
             </div>
            }

        </div>
    )
}


export default SplashPage