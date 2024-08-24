import React, { useState } from 'react'
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [creds, setcreds] = useState({ username: "", password: "" })
    const [buffer, setbuffer] = useState(false)

    const [errorMessage, setErrorMessage] = useState(""); // State to store error message

    let navigate = useNavigate();


    const handleClick = async (e) => {
        setErrorMessage("")
        const url = "https://inotes-kwax.onrender.com";
        e.preventDefault();
        try {
            setbuffer(true);
            let response = await fetch(`${url}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: creds.username, password: creds.password }),
            });

            if (response.ok) {
                const authToken = await response.json(); // Assuming the token is returned in JSON
                setbuffer(false)
                console.log("Login successful", authToken.authToken);
                localStorage.setItem('token', authToken.authToken)
                setErrorMessage("");
                navigate("/home") // Clear any previous error messages
                // Handle successful login (e.g., save token, redirect, etc.)

            } else if (response.status === 401) {
                setbuffer(false)
                setErrorMessage("Incorrect username or password.");
            } else {
                setbuffer(false)
                setErrorMessage("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.log("Error:", error);
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    const onChange = (e) => {
        setcreds({ ...creds, [e.target.name]: e.target.value })
    }
    const Register = ()=>{
        navigate("/signup")
    }

    return (
        <div style={{ width: 30 + 'vw' }} className='container my-2'>
            <form onSubmit={handleClick} className='my-4' >
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Usernmame</label>
                    <input type="text" className="form-control" id="username" name="username" value={creds.username} aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">we will never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={creds.password} onChange={onChange} />
                </div>
                {buffer && <Spinner />}
                {errorMessage && <div className="alert alert-danger alert-dismissible d-flex justify-content-between"><span>{errorMessage}</span><button style={{ backgroundColor: '#f8d7da' }} onClick={() => { setErrorMessage("") }}>&times;</button></div>}
                <div className='d-flex justify-content-between'>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button type="submit" className="btn btn-primary" onClick={Register}>SignUp</button>
                </div>
            </form>
        </div>
    )
}

export default Login
