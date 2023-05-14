import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


const Login = (props) => {

    const [credentials, setCredentials] = useState({email: "", password: ""});

    let navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // prevents the page from loading

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
          });

          const json = await response.json();
          console.log(json);
          if(json.success){
            // save the auth token
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Logged in successfully!", "success");
            //redirect to home
            navigate('/');
          }
          else{
            props.showAlert("Invalid credentials", "danger");
          }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

    return (
        <div>
        <form className="my-4" onSubmit={handleLogin}>
            <div className="mb-3">
            <label htmlFor="email" className="form-label">
                Email
            </label>
            <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                onChange={onChange}
                value={credentials.email}
                required
                aria-describedby="emailHelp"
            />
            </div>
            <div className="mb-3">
            <label htmlFor="password" className="form-label">
                Password
            </label>
            <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={onChange}
                required
                value={credentials.password}
            />
            </div>
            <button type="submit" className="btn btn-primary">
            Login
            </button>
        </form>
        </div>
    );
};

export default Login;
