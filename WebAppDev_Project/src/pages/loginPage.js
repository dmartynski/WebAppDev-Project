import React, { useContext, useState } from "react";
import { Navigate } from 'react-router-dom';
import { MoviesContext } from '../contexts/moviesContext';
import { Link } from "react-router-dom";


const LoginPage = props => {
    const context = useContext(MoviesContext)
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        context.authenticate(userName, password);
    };


    if (context.isAuthenticated === true) {
        return <Navigate to="/page=1" />;
    }
    return (
        <>
            <h2>Login page</h2>
            <p>Please Log in to see the Available Movies </p>
            <input id="username" placeholder="User Name" onChange={e => {
                setUserName(e.target.value);
            }}>
            </input>

            <br/>
            <br/>

            <input id="password" type="password" placeholder="Password" onChange={e => {
                setPassword(e.target.value);
            }}>
            </input>

            <br/>
            <br/>

            {/* Login web form  */}
            <button id="button" onClick={login}>Log in</button>
            <p>Not Registered?
                <Link to="/register">Sign Up!</Link>
            </p>
        </>
    );
};

export default LoginPage;