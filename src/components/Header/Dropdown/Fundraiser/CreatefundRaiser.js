import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./CreateFundRaiser.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { storage } from "../../../../FireBase/FireBase";
import { useHistory } from "react-router-dom";
import { JourneyStep } from 'react-journey';
// import "./CreatefundRaiser.css;
// import userId from "../../../../reducers/login/userId";

const CreatefundRaiser = (e) => {
  let tokenSave = localStorage.getItem("token");
  // let userIdSave = localStorage.getItem("CurrentUserId");
  // const [progress, setProgress] = useState(0);
    // const [image, setImage] = useState();

  // const state1 = useSelector((state) => {
  //   return { token: state.token_1.token };
  // });
  const state2 = useSelector((state2) => {
    return { userId: state2.userId.userId };
  });

  const [categorys, setCategorys] = useState();
  const history = useHistory();
  const [country, setCountry] = useState("");
  const [typee, setType] = useState("");
  const [targett, setTarget] = useState("");
  const [title, setTitle] = useState("");
  const [descriptionn, setDescriptionn] = useState("");
  const [url, setUrl] = useState("");
  const [phoneNumber,setPhoneNumber] = useState(0);
  // const [img, setImg] = useState("");


  const insertfundRaiser = (e) => {
    e.preventDefault();
    const theFundRaiserCreated = {
      userId: state2.userId,
      country: country,
      typee: typee,
      targett: targett,
      img: url,
      title: title,
      descriptionn: descriptionn,
      phoneNumber: phoneNumber,
    };
    axios
      .post(`/fundraiser`, theFundRaiserCreated, {
        headers: { Authorization: `Bearer ${tokenSave}` },
      })
      .then((result) => {
        console.log("result", result);
      })
      .catch((err) => {
        console.log(err);
      });
      history.push("/Drop/YourFundraisers")
  };
  useEffect(() => {
    axios
      .get("/fundraiser/categorys/categorys/categorys")
      .then((result) => {
        setCategorys(result.data.allData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [categorys]);
  // const handleChange = async(e) => {
  //   if (e.target.files[0]) {
  //    await setImage(e.target.files[0]);             await doesnt affect this type of function , it needs time so we handle it by
  //    console.log("inside",e.target.files[0])        targeting 
  //    console.log("inside image",image)
  //   }
    
    //  await  handleUpload()
  // };

  const handleUpload =  (e) => {
    let image = e.target.files[0]
       const uploadTask =  storage.ref(`images/${image.name}`).put(image);
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
  const handler = (e) => {
    setType(e.target.value);
  };

  const handler2 = (e) => {
    setCountry(e.target.value);
  };

  return (
    <div className="Create-fundraiser-form">
    <div className="container">
      <h4>Create New Fundraiser</h4>
    <Form onSubmit={insertfundRaiser}>
  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Your Fundraiser Title </Form.Label>
      <JourneyStep message="Pick a meaningful title for your fundraiser">
      <Form.Control type="text" placeholder="Here ..." onChange={(e)=>{setTitle(e.target.value)}}/>
      </JourneyStep>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword" className='goal'>
     <Form.Label>Set your fundraiser goal</Form.Label>
     <JourneyStep message="Set your target here and make sure that it is within reason">
      <Form.Control type="number" placeholder="Here ... " onChange={(e)=>{setTarget(e.target.value)}} />
      </JourneyStep>
    </Form.Group>
  </Row>

  <Form.Group className="mb-3" controlId="formGridAddress1">
    <Form.Label>Upload image</Form.Label>
    <JourneyStep message="Choose a meaningful picture">
    <Form.Control type='file' placeholder="Image"
            onChange={handleUpload}/>
            </JourneyStep>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formGridAddress2">
    <Form.Label>Your Fundraiser description </Form.Label>
    <JourneyStep message="Describe your status and why are you starting this fundraiser">
    <textarea className="form-control" type="text" id="exampleFormControlTextarea1" placeholder="Here ..." rows="3" onChange={(e)=>{setDescriptionn(e.target.value)}} maxLength="245" ></textarea>
    </JourneyStep>
  </Form.Group>

  <Row className="mb-3">

  <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Choose Your Country</Form.Label>
      <JourneyStep message="Choose a correct category that reflects on the type of this fundraiser">
      <Form.Select aria-label="Default select example"
 onChange={handler2}> 
      <option hidden value='0'>Choose Your Country </option>
            <option value='Jordan'>Jordan</option>
            <option value='China'>China</option>
            <option value='Denmark'>Denmark</option>
            <option value='Egypt'>Egypt</option>
            <option value='Russia'>Russia</option>
            <option value='Canada'>Canada</option>
            <option value='Spain'>Spain</option>
      </Form.Select>
      </JourneyStep>
    </Form.Group>


    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Category</Form.Label>
      <JourneyStep message="Choose a correct category that reflects on the type of this fundraiser">
      <Form.Select aria-label="Default select example"
 onChange={handler}> 
      <option value="0">Select a Category</option>
      {categorys &&
              categorys.map((elm,index) => {
                return <option key = {index} value={elm.id}>{elm.namee}</option>;
              })}
      </Form.Select>
      </JourneyStep>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>PhoneNumber</Form.Label>
      <JourneyStep message="How can we contact you? Enter your phone number here">
      <Form.Control type='number' placeholder="Here ..." onChange={(e)=>{setPhoneNumber(e.target.value)}}/>
      </JourneyStep>
    </Form.Group>
  </Row>
  <JourneyStep message="Submit and Good Luck !">
  <button variant="primary" type="submit">
    Submit
  </button>
  </JourneyStep>
</Form>
</div>
    </div>
  );
};

export default CreatefundRaiser;
