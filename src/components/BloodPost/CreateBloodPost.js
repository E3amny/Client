import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {useHistory} from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "./BloodPostView.css";
import { storage } from "../../FireBase/FireBase";


const CreateBloodPost = (e) => {
  const history = useHistory();
    let tokenSave = localStorage.getItem("token");
    let userIdSave = localStorage.getItem("CurrentUserId")

  // const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [descriptionn, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const insertBloodPost = (e) => {
    e.preventDefault();
    const theBloodPostCreated = {
      userId: userIdSave,
      img: url,
      title,
      descriptionn,
    };
    axios
      .post(`/bloodpost/createBloodPost/createBloodPost`, theBloodPostCreated, {
        headers: { Authorization: `Bearer ${tokenSave}` },
      })
      .then((result) => {
      })
      .catch((err) => {
        console.log(err);
      });
      history.push("/");
  };

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
 

  return (
    <>
    <div className='Main-Create-Blood'>
    <div className="container">
      <h4>Ask for a blood Donation</h4> 
      <Form onSubmit={insertBloodPost}>
       
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type='file'
            placeholder="Image"
            onChange={handleUpload}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label> Description </Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </Form.Group>
        <button variant="primary" type="submit" >
          {" "}Create{" "}
        </button>
      </Form>
      </div>
    </div>
    </>
  );
};

export default CreateBloodPost