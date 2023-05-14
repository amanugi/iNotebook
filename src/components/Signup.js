import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""});

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevents the page from loading

        const {name, email, password} = credentials;

        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name, email, password})
          });

          const json = await response.json();
          console.log(json);
        
          if(json.success){
            // save the auth token
            localStorage.setItem('token', json.authToken);
            props.showAlert("Account created successfully!", "success");
            //redirect to home
            navigate('/');
          }
          else{
            props.showAlert("User already exists", "danger");
          }

    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

  return (
    <div>
        <h2>Sign-up to Create an Account</h2>
        <form className="my-4" onSubmit={handleSubmit}>
            <div className="mb-3">
            <label htmlFor="name" className="form-label">
                Name
            </label>
            <input
                type="name"
                className="form-control"
                id="name"
                name="name"
                onChange={onChange}
                value={credentials.name}
                aria-describedby="namelHelp"
            />
            </div>
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
                minLength={5}
                value={credentials.password}
                required
            />
            </div>
            <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
               Confirm Password
            </label>
            <input
                type="password"
                className="form-control"
                id="cpassword"
                name="cpassword"
                onChange={onChange}
                minLength={5}
                value={credentials.cpassword}
                required
            />
            </div>
            <button type="submit" className="btn btn-primary">
                Sign-up
            </button>
        </form>
        </div>
  )
}

export default Signup;
