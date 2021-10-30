import React, { useState} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../../reducers/login/token";
import { setIsLoggedIn } from "../../../reducers/login/isLoggedIn";
import { setUserAvatar } from "../../../reducers/login/userAvatar";
import axios from "axios";
import { setUserId } from "../../../reducers/login/userId";
import FacebookLogin from 'react-facebook-login';
import { Card, Image } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"; 
import Form from 'react-bootstrap/Form';
import {AiOutlineExclamation} from 'react-icons/ai';
import './login.css';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
// import { ToastContainer, toast } from "react-toastify";

export const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [passwordd, setPasswordd] = useState("");
  const [logoutChecker , setLogoutChecker] = useState(false)
  //facebookstuff
  const [login1, setLogin1] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState("");
  const [fbmail,setFbmail] = useState("")
  const [fbpass,setFbpass] = useState("")
  // const [isadmin,setIsadmin] = useState("")
  const dispatch = useDispatch();


  const goToForgetMain = () =>{
    history.push('/ForgotMainPage')
  }
  const loginSender = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login", {
        email,
        passwordd,
      });
      if(res.data.payload.email == "admin@admin.com"){
        // await  setIsadmin(true)
        dispatch(setUserId(res.data.payload.userId))
        // await   localStorage.setItem("isAdmin", isadmin);
        history.push("/admin");
        
      }else{
        if (res.data.success) {
          setMessage("");
          dispatch(setIsLoggedIn(true));
          dispatch(setToken(res.data.token));
          dispatch(setUserId(res.data.payload.userId))
          dispatch(setUserAvatar(res.data.payload.img))
          setLogoutChecker(true)
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("logoutChecker" , logoutChecker)
          localStorage.setItem("CurrentUserId",res.data.payload.userId)
          localStorage.setItem('customerName', res.data.payload.firstName)
          history.push("/")
        } else throw Error;
      }
    } catch (error) {
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
    }
  };
  
  //facebookstuff
 
  
  const responseFacebook = async(response) => {
    if (response.status === "unknown") {
      return;
    }
    setData(response);
    if (!response.picture.data.url) {
      return;
    } else {
    let Facebookimage = response.picture.data.url //fb img
    // let FacebookName = response.name.split(" ").toString().replace(",", "") // firstnamelastname
    let Fname = response.name.split(" ")
    let FacebookfName = Fname[0]
    let FacebooklName = Fname[1]
    let Facebookmail = response.email
    setFbmail(Facebookmail)
    let FacebookPassword = Math.random().toString(36).slice(-8);
    setFbpass(FacebookPassword)
      
    let firstName, lastName, age, img, email, passwordd, country;
    firstName=FacebookfName
    lastName=FacebooklName
    img=Facebookimage
    age=18
    email=Facebookmail
    passwordd=FacebookPassword
    country="temporaycountry"
    
    const theUser = {
      firstName,
      lastName,
      age,
      img,
      email,
      passwordd,
      country
  }
    axios.post('/signup' , theUser).then((result)=>{
      if (result){
       
        setMessage("Check your email for your password")
      }
      
    }).catch((error) =>{
       setMessage("Duplicate Email Found, user has account")
         dispatch(setIsLoggedIn(true));
         dispatch(setToken(response.accessToken));
         dispatch(setUserAvatar(response.picture.data.url))
         localStorage.setItem("token", response.accessToken);
         localStorage.setItem("CurrentUserId",response.userID)
         setPicture(response.picture.data.url);
       history.push("/")
    })
    }
   
  }; //end facebookstuff

  // FB.logout(function(response) {
  //   // user is now logged out
  // });


  return (
    <>
        <div className="main-form">
          <Container className="main-Error">
            {message && message.length > 0 ? [
  'danger'
].map((variant, idx) => (
  <Alert key={idx} variant={variant} className='Alert-login'>
  
  <AiOutlineExclamation className='Error-Login'/> {message}
  </Alert>
)) : ""}

          </Container>
          <div className="form-login">
            <h3 className="title-form">Sign in </h3>
            <hr></hr>
            <div className="login-with-facebook">
            <Card>
          
            {!login1 && (
              <FacebookLogin
                appId="1259903211090202"
                autoLoad={false}
                fields="name,email,picture"
                scope="public_profile,user_friends,email"
                callback={responseFacebook}
                icon="fa-facebook"
              />
            )}
            {login1 && <Image src={picture} roundedCircle />}
          
          {login1 && (
            
              {/* <Card.Title>{data.name}</Card.Title>
              <Card.Text>{data.email}</Card.Text> */}
            
          )}
        </Card>
            </div>

            <div className="option-login">

            <span>or</span>
            </div>
        <Form onSubmit={loginSender} className=''>
  <Form.Group className="mb-3" controlId="formBasicEmail" >
    <Form.Control type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} required />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Control type="password" placeholder="Password"  onChange={(e) => setPasswordd(e.target.value)} required/>
  </Form.Group>
  <input type="submit" className="sgin-btn" value='Sign in to Ed3amny'/>

  <button onClick={()=>{history.push('/signup')}} className="sgin-btn"> or Sign up </button>
</Form>
<hr></hr>
<div className='forget-password'>
  <p onClick={goToForgetMain}>Forgot Your Password ?</p>
</div>
<div className="LoginErrors">
<p>{fbmail}</p>
<p>{fbpass}</p>
</div>
        </div>
        </div>

    </>
  );
};
/*

*/
