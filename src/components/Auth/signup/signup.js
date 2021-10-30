import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "./signup.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import {AiOutlineExclamation} from 'react-icons/ai';

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [img, setImg] = useState("https://www.gofundme.com/static/media/DefaultAvatar.4bb188e1d41df75419450a820a958679.svg");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [passwordd, setPasswordd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldpassword , setFieldpassword] = useState('');
  const history = useHistory();

  //Messgae error

 

  const insertNewUser = (e) => {
    e.preventDefault();
    var regex = /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g;
    if(confirmPassword !== passwordd){
      setFieldpassword("Password fields do not match");
    }else if(passwordd.length < 6){
      setFieldpassword("Password Must be greater Than 6 characters");
    }else if(regex.test(passwordd) == false){
      setFieldpassword('Password must contain at least one special character');
    }else{
      const theUsers = {
        firstName,
        email,
        country,
        passwordd,
        img,
      };
      axios
        .post("/signup", theUsers)
        .then((result) => {
          history.push("/login");
        })
        .catch((err) => {
          if(err.message == "Request failed with status code 409"){
            setFieldpassword("Email is already taken")
          }
        });
    }
  };

  const handler = (e) => {
    setCountry(e.target.value);
  };

  return (
    <>
      <div className="Main-SignUp">
      <Container className="main-Error">
            {fieldpassword && fieldpassword.length > 0 ? [
  'danger'
].map((variant, idx) => (
  <Alert key={idx} variant={variant} className='Alert-login'>
  
  <AiOutlineExclamation className='Error-Login'/> {fieldpassword}
  </Alert>
)) : ""}

          </Container>
        <div className="form-signup">
          <h3 className="title-form">Sign Up </h3>
          <hr></hr>
          <Form onSubmit={insertNewUser}>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formBasicEmail">
              <Form.Control
              required
                type="text"
                placeholder="First Name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
            <Form.Select defaultValue="Choose Your Country..." onChange={handler}>
            <option hidden value='0'>Country </option>
            <option value='Jordan'>Jordan</option>
            <option value='China'>China</option>
            <option value='Denmark'>Denmark</option>
            <option value='Egypt'>Egypt</option>
            <option value='Russia'>Russia</option>
            <option value='Canada'>Canada</option>
            <option value='Spain'>Spain</option>
          </Form.Select>
          </Form.Group>
            </Row>
            <Form.Group className="mb-3"  controlId="formBasicPassword">
              <Form.Control
              required
                type="text"
                placeholder="E-mail"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
              required
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPasswordd(e.target.value);
                }}
              />
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
              required
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </Form.Group>

            
            <button variant="primary" className="signup-btn" type="submit">
              Next
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Signup;
