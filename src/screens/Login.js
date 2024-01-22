import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  let navigate =useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      email: credentials.email,
      password: credentials.password,
    };
  
    const response = await fetch("http://localhost:5001/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
  
    const jsonResponse = await response.json();
  
    console.log("Response:", jsonResponse);
  
    if (jsonResponse.success) {
      navigate("/");
    } else {
      const errorMessage = jsonResponse.error || "An unexpected error occurred.";
      console.error("Login failed:", errorMessage);
      alert(errorMessage); // Display a user-friendly error message
    }
  };
  
  
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>

          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/createuser" className="m-3 btn btn-danger">
            new user?{" "}
          </Link>
        </form>
      </div>
    </>
  );
}
