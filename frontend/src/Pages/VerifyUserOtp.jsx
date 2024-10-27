import React, {useState, useEffect} from 'react'
// import './CSS/VerifyUserOtp.css';
import axios from 'axios';

const VerifyUserOtp = () => {

    const [enteredOTP, setEnteredOTP] = useState('');
    const [formData, setFormData] = useState({});
    
    useEffect(() => {
      const savedFormData = localStorage.getItem('formData');
      if (savedFormData) {
        setFormData(savedFormData);
      }
    }, []);
  
    const handleVerifyOTP = async () => {
      let responseData;
      axios.post("http://localhost:4000/useraccount/signup", { formData, otp :  enteredOTP })
        .then(response => {
          console.log(response.data)
          responseData = response.data;
  
          if (responseData.success) {
            localStorage.setItem("auth-token", responseData.token);
            localStorage.removeItem('formData');
            window.location.replace("/");
          } else {
            alert(responseData.error);  
          }
        })
        .catch(error => {
          console.error('Failed to verify OTP:', error);
        });
    };

  return (
    <div className="loginsignup">
    <div className="loginsignup-container">
    <div><h2>Verify Otp</h2></div>
    <div className="loginsignup-fields">
    <input type="text" value={enteredOTP} onChange={e => setEnteredOTP(e.target.value)} />
    </div>
    <button onClick={handleVerifyOTP}>Verify OTP</button>
    </div>
  </div>  
  )
}

export default VerifyUserOtp