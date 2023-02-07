import { useState, useEffect } from "react";
import { validEmail, validUsername, validPassword } from "./Regex";

export default function Register () {
    const [user, setUser] = useState({});
    const [reigsterError, setRegisterError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    function updateEmail (e) {
        let updatedUser = user;
        updatedUser.email = e.target.value;
        setUser(updatedUser);
    }

    function updateUsername (e) {
        let updatedUser = user;
        updatedUser.username = e.target.value;
        setUser(updatedUser);
    }

    function updatePassword (e) {
        let updatedUser = user;
        updatedUser.password = e.target.value;
        setUser(updatedUser);
    }

    function updatepasswordConfirm (e) {
        let updatedUser = user;
        updatedUser.passwordConfirm = e.target.value;
        setUser(updatedUser);
    }

    function updateBirthday (e) {
        let updatedUser = user;
        updatedUser.birthday = e.target.value;
        setUser(updatedUser);
    }

    function updateShowPassword (e) {
        setShowPassword(e.target.checked);
    }

    function veryifyUserRegistration() {
        if (verifyEmail() && veryifyUsername() && verifyPassword() && verifyBirthday()) {
            setRegisterError("");
            return true;
        }

        return false;
    }

    function verifyEmail() {
        if (user.email === undefined) {
            setRegisterError("Email is required.");
            return false;
        }

        if (user.email === null) {
            setRegisterError("Email is required.");
            return false;
        }

        if (user.email.length > 16) {
            setRegisterError("Email must be no greater than 254 characters.");
            return false;
        }

        if (user.email.length <= 0) {
            setRegisterError("Email is required.");
            return false;
        }

        if (validEmail.test(user.email) === false) {
            setRegisterError("Email format is not valid.");
            return false;
        }

        return true;
    }

    function veryifyUsername() {
        if (user.username === undefined) {
            setRegisterError("Username is required.");
            return false;
        }

        if (user.username === null) {
            setRegisterError("Username is required.");
            return false;
        }

        if (user.username.length > 16) {
            setRegisterError("Username must be no greater than 16 characters.");
            return false;
        }

        if (user.username.length <= 0) {
            setRegisterError("Username is required.");
            return false;
        }

        if (validUsername.test(user.username) === false) {
            setRegisterError("Username can only contain letters and numbers.");
            return false;
        }

        return true;
    }

    function verifyPassword() {
        if (user.password === undefined) {
            setRegisterError("Password is required.");
            return false;
        }

        if (user.password === null) {
            setRegisterError("Password is required.");
            return false;
        }

        if (user.password.length > 16) {
            setRegisterError("Password must be no greater than 16 characters.");
            return false;
        }
        
        if (user.password.length < 8) {
            setRegisterError("Password must be longer than 8 characters.");
            return false;
        }

        if (validPassword.test(user.password) === true) {
            setRegisterError("Password must include an uppercase letter, a lowercase letter, a number, and a special character.");
            return false;
        }

        if (user.passwordConfirm === undefined) {
            setRegisterError("Password and confirm password must match.");
            return false;
        }

        if (user.passwordConfirm === null) {
            setRegisterError("Password and confirm password must match.");
            return false;
        }

        if (user.password != user.passwordConfirm) {
            setRegisterError("Password and confirm password must match.");
            return false;
        }

        return true;
    }

    function verifyBirthday() {


        return true;
    }

    function submitRegistration (e) {
        console.log(user);

        if (veryifyUserRegistration() === false) {
            return;
        }

        fetch('/register', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({user})
        })
        .then((response) => response.json())
        .then((result) => console.log(result));
    }

    function PasswordInput() {
        if (showPassword) {
            return (
                <div>
                    <p>Password:</p>
                    <input type="text" value={user.password} onChange={updatePassword}></input>
                    <p>Confirm Password:</p>
                    <input type="text" value={user.passwordConfirm} onChange={updatepasswordConfirm}></input>
                </div>
            )
        } else {
            return (
                <div>
                    <p>Password:</p>
                    <input type="password" value={user.password} onChange={updatePassword}></input>
                    <p>Confirm Password:</p>
                    <input type="password" value={user.passwordConfirm} onChange={updatepasswordConfirm}></input>
                </div>
            )
        }
    }

    return (
        <div>
            <h1>Register</h1>
                <p className="error">{reigsterError}</p>
                <p>Email:</p>
                <input type="email" onChange={updateEmail}></input>
                <p>Username:</p>
                <input type="text" onChange={updateUsername}></input>
                <PasswordInput />
                <p>Show password:</p>
                <input type="checkbox" checked={showPassword} onChange={updateShowPassword}></input>
                <p>Birthday:</p>
                <input type="date" onChange={updateBirthday}></input>
                <br></br>
                <br></br>
                <button onClick={submitRegistration}>Register</button>
        </div>
        
    )
}