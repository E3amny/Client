import React, { useState } from "react";
import "./ForgotMain.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const ForgotMainPage = () => {
    const history = useHistory();
  const [emailCheck, setEmailCheck] = useState("");
  const [showEmailCheck, setShowEmailCheck] = useState(false);
  // const [smsCheck, setSmsCheck] = useState("");
  const [showSmsCheck, setShowSmsCheck] = useState(false);

  const emailCheckForSend = () => {
    setShowEmailCheck(true);
    console.log("showEmailCheck", showEmailCheck);
  };

  // const smsCheckForSend = () => {
  //   setShowSmsCheck(true);
  //   console.log("showSmsCheck", showSmsCheck);
  // };
  const sendEmail = (e) => {
    console.log("i am here");
    e.preventDefault();
    let email = emailCheck;
    console.log(email);
    axios
      .post("/forgetPassword", { email })
      .then((result) => {
        console.log("result", result);
      })
      .catch((err) => {
        console.log(err);
      });
    setEmailCheck("");
    history.push('/login')
  };
  console.log("showEmailCheck 2", showEmailCheck);

  return (
    <>
        <div className='Main-forgetPass'>
        <div className="errorMessage">
         
          <h2>
            We will send you a new <br></br> password on this email
          </h2>
          <input type="email"
            placeholder="Enter Your Email"/>
          <button onClick={sendEmail} type="submit">
            Send
          </button>
        </div>
        </div>
        </>    
  );
      }

export default ForgotMainPage;
