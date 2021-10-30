import React, { useState, useEffect } from "react";
import "./AccountSettings.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { storage } from "../../../../FireBase/FireBase";
import { useDispatch } from "react-redux";
import { setUserAvatar } from "../../../../reducers/login/userAvatar";
// import { AiFillCheckCircle } from "react-icons/ai";

const AccountSettings = () => {
  let tokenSave = localStorage.getItem("token");
  let userIdSave = localStorage.getItem("CurrentUserId");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [img, setImg] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [successUpdate, setSuccesssUpdate] = useState("");
  const [url, setUrl] = useState("");
  const [toggle,setToggle]=useState(false)
  const dispatch = useDispatch();
  // const [image, setImage] = useState(null);
  // const [gender, setGender] = useState('');


  useEffect(() => {
    axios
      .get(`/search/GetUserById/${userIdSave}`, {
        headers: {
          Authorization: `Bearer ${tokenSave}`,
        },
      })
      .then((result) => {
        // console.log("result here",result)
        // console.log("result.data here",result.data)
        // console.log("result.data here",result.data.result[0].firstName)
        setFirstName(result.data.result[0].firstName);
        setLastName(result.data.result[0].lastName);
        setAge(result.data.result[0].age);
        setImg(result.data.result[0].img);
        setCountry(result.data.result[0].country);
        setPhoneNumber(result.data.result[0].phoneNumber);
        
      })
      .catch((err) => console.log(err));
  }, [toggle]);

  const onUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios
        .put(
          `/search/AccountSettings/update/${userIdSave}`,
          {
            firstName: firstName,
            lastName: lastName,
            age: age,
            img: url,
            country: country,
            phoneNumber: phoneNumber,
          },
          {
            headers: {
              Authorization: `Bearer ${tokenSave}`,
            },
          }
        )
        .then((result) => {
          setSuccesssUpdate(`Your account was successfully saved.`);
        });
    } catch (error) {
      console.log(error);
    }
    setToggle(true)
    dispatch(setUserAvatar(url))
  };

  //---
//   const handleChange = (e) => {
//     if (e.target.files[0]) {
//       setImage(e.target.files[0]);
//     }
//     handleUpload()
//   };

  const handleUpload = async (e) => {
      let image = e.target.files[0]
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          });
      }
    );
    
  };

  return (
    <div className="Main-Edit-Profile">
      <div className="container">
        <h4>Account Settings </h4>
        <hr></hr>
        <img src={img} alt= "no-img"/> 
        <div>
          <p className="success-update"> {successUpdate}</p>
          <Form onSubmit={onUpdate}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Age</Form.Label>
              <Form.Control
                placeholder={age}
                type="text"
                onChange={(e) => setAge(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Image</Form.Label>
              <Form.Control
                placeholder="image"
                type="file"
                onChange={handleUpload}
                // onChange={(e) => setImg(e.target.value)}
              />
            </Form.Group>
            

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Country</Form.Label>
              <Form.Control
                placeholder={country}
                type="text"
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                placeholder={phoneNumber}
                type="number"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Group>

            <button className="change_info" type="submit">
              Save Change
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
