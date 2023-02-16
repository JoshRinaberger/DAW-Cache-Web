import { useState, useEffect } from "react";

export default function Login () {
    const [loginCredentials, setLoginCredentials] = useState({});
    const [loginError, setLoginError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    function updateAccountName (e) {
        let updatedLoginCredentials = loginCredentials;
        updatedLoginCredentials.accountName = e.target.value;
        setLoginCredentials(updatedLoginCredentials);
    }

    function updatePassword (e) {
        let updatedLoginCredentials = loginCredentials;
        updatedLoginCredentials.password = e.target.value;
        setLoginCredentials(updatedLoginCredentials);
    }

    function updateShowPassword (e) {
        setShowPassword(e.target.checked);
    }

    async function login (e) {
        console.log(loginCredentials);

        if (loginCredentials.accountName === undefined || loginCredentials.password === undefined ||
            loginCredentials.accountName.length === 0 || loginCredentials.password.length === 0) {
            setLoginError("Username and password required.");
            return;
        } 

        setLoginError("");

        const reponse = await fetch('/login', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ 
                accountName: loginCredentials.accountName,
                password: loginCredentials.password })
        });

        const loginResult = await reponse.json();
        console.log(loginResult);
    }

    useEffect(() => {
        fetch("/login/isAuthenticated")
        .then(response => response.json())
        .then(data => {
            console.log("LOGIN AUTH");
            console.log(data)
        });
    })

    return (
        <div>
            <h1>Login</h1>
            <p className="error">{loginError}</p>
            <p>Username/Email:</p>
            <input type="text" onChange={updateAccountName}></input>
            <p>Password:</p>
            <input type={showPassword ? "text" : "password"} onChange={updatePassword}></input>
            <p>Show Password:</p>
            <input type="checkbox" onChange={updateShowPassword}></input>
            <br></br>
            <br></br>
            <button onClick={login}>Login</button>
        </div>

    )
}