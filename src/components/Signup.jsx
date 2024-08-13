import React, { useState } from 'react'
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const [creds, setcreds] = useState({ username: "", password: "", email: "", cpass: "" })
    const [buffer, setbuffer] = useState(false)

    const [errorMessage, setErrorMessage] = useState(""); // State to store error message

    let navigate = useNavigate();

    
    const handleClick = async (e) => {
        e.preventDefault();

        if (creds.username == '' || creds.password == "" || creds.cpass == "" || creds.email == "") {
            setErrorMessage("Please fill all Fields")
            return
        }
        // Function to check if a string contains whitespace
        const hasWhiteSpace = (s) => /\s/.test(s);

        // Iterate over each key-value pair in the creds object
        Object.values(creds).forEach((key) => {
            if (hasWhiteSpace(creds[key])) {
                setErrorMessage(`${key} contains space`);
                return;
            }
        });


        setErrorMessage("")
        const url = "http://localhost:3000";

        try {
            setbuffer(true);
            let response = await fetch(`${url}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: creds.username, password: creds.password, email: creds.email }),
            });

            if (response.ok) {
                const authToken = await response.json(); // Assuming the token is returned in JSON
                setbuffer(false)
                console.log("Signup successful", authToken);
                localStorage.setItem('token', authToken)
                setErrorMessage("");
                navigate("/home") // Clear any previous error messages
                // Handle successful login (e.g., save token, redirect, etc.)

            } else if (response.status === 406) {
                setbuffer(false)
                if (creds.username.length < 3) {
                    setErrorMessage("Username length must be 3 characters");
                }
                else if (creds.password.length < 6) {
                    setErrorMessage("Password must be 6 hcaracters");
                }
                else if (creds.password != creds.cpass) {
                    setErrorMessage("Password doesnto match");
                }
                else {
                    setErrorMessage("Some error occurred. Please try again.");
                }
            } else if (response.status === 400) {
                setbuffer(false)
                setErrorMessage("Uses Already Exsist");
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


    return (
        <div>
            <form onSubmit={handleClick} className='my-4' >
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Usernmame</label>
                    <input type="text" className="form-control" id="username" name="username" value={creds.username} aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">we will never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Enter Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={creds.email} aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">we will never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={creds.password} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpass" name="cpass" value={creds.capss} onChange={onChange} />
                </div>
                {buffer && <Spinner />}
                {errorMessage && <div className="alert alert-danger alert-dismissible d-flex justify-content-between"><span>{errorMessage}</span><button style={{ backgroundColor: '#f8d7da' }} onClick={() => { setErrorMessage("") }}>&times;</button></div>}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
