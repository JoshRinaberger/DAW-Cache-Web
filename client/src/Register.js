import { useState, useEffect } from "react";

export default function Register () {
    const [user, setUser] = useState({});

    function updateEmail (e) {
        let updatedUser = user;
        updatedUser.email = e.target.value;
    }

    function updateUsername (e) {
        let updatedUser = user;
        updatedUser.username = e.target.value;
    }

    function updatePassword (e) {
        let updatedUser = user;
        updatedUser.password = e.target.value;
    }

    function updatepasswordConfirm (e) {
        let updatedUser = user;
        updatedUser.passwordConfirm = e.target.value;
    }

    function updateBirthday (e) {
        let updatedUser = user;
        updatedUser.birthday = e.target.value;
    }

    function submitRegistration (e) {
        console.log(user);

        fetch('/register', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then((response) => response.json())
        .then((result) => console.log(result));
    }

    return (
        <div>
            <h1>Register</h1>
                <p>Email:</p>
                <input type="email" onChange={updateEmail}></input>
                <p>Username:</p>
                <input type="text" onChange={updateUsername}></input>
                <p>Password:</p>
                <input type="text" onChange={updatePassword}></input>
                <p>Confirm Password:</p>
                <input type="text" onChange={updatepasswordConfirm}></input>
                <p>Birthday:</p>
                <input type="date" onChange={updateBirthday}></input>
                <br></br>
                <br></br>
                <button onClick={submitRegistration}>Register</button>
        </div>
        
    )
}