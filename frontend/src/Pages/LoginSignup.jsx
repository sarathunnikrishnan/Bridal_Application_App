import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import axios from "axios";
import { useNavigate} from 'react-router-dom';

const LoginSignup = () => {
  const [state, setState] = useState("Log In");
  let navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [message, setMessage] = useState("");  
  const [showPassword, setShowPassword] = useState(false)

  const showPasswordHandler = () => {
      setShowPassword(!showPassword);
  }

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleVerifyOTP = async() => {
    localStorage.setItem('formData', JSON.stringify(formData));

    try {
      const otpResponse = await axios.post('http://localhost:4000/useraccount/userotpsend', formData);
    
      if (otpResponse.data === "OTP Send Your Gmail Account") {
        // Assuming `useNavigate` is properly set up
        navigate('/verifyuserotp');
      }else{
        setMessage(otpResponse.data.error)
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
};  

  const login = async () => {
    console.log("Login Function Executed", formData);
    let responseData;
    // await fetch("http://localhost:4000/login", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/form-data",
    //     "content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => (responseData = data));
    await  axios.post('http://localhost:4000/useraccount/login', formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      responseData = response.data;
    })
    .catch(error => {
      console.error('Error logging in:', error);
    });

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      setMessage(responseData.error);
    }
  };

  
  // const signup = async () => {
  //   console.log("signup Function Executed", formData);
  //   let responseData;
  //   // await fetch("http://localhost:4000/signup", {
  //   //   method: "POST",
  //   //   headers: {
  //   //     Accept: "application/form-data",
  //   //     "content-Type": "application/json",
  //   //   },
  //   //   body: JSON.stringify(formData),
  //   // })
  //   //   .then((response) => response.json())
  //   //   .then((data) => (responseData = data));
  //   await axios.post('http://localhost:4000/useraccount/signup', formData, {
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     }
  //   }).then(response=>{
  //     responseData = response.data;
  //   })
  

  //   if (responseData.success) {
  //     localStorage.setItem("auth-token", responseData.token);
  //     window.location.replace("/");
  //   } else {
  //     alert(responseData.errors);
  //   }
  // };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <>
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name" 
            />
            {(message.toLocaleLowerCase().includes("username")) ? (<p className="error-message">{message} !!!</p>) : null}
            </>
          ) : (
            <></>
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
          />
          {(message.toLocaleLowerCase().includes("email")) ? (<p className="error-message">{message} !!!</p>) : null}
          <input
            name="password"
            value={formData.password} 
            onChange={changeHandler}
            type={(!showPassword) ? "password" : "text"}
            placeholder="Create Password"
          />
          <p className="show-password" onClick={showPasswordHandler}>{((!showPassword) ? (<i class="fa-solid fa-eye-slash"></i>) : (<i class="fa-solid fa-eye"></i>))}</p>
          {(message.toLocaleLowerCase().includes("password")) ? (<p className="error-message">{message} !!!</p>) : null}
        </div>
        <button
          onClick={() => {
            state === "Log In" ? login() : handleVerifyOTP();  
          }}
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an accout?{" "}
            <span
              onClick={() => {
                setState("Log In");
              }}
            >
              Log In Here
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an accout?{" "}
            <span
              onClick={() => {
                setState("Sign Up");
              }}
            >
              Click Here
            </span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
