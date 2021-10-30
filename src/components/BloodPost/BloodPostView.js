import { React, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { MdBloodtype } from 'react-icons/md';
import "./BloodPostView.css"

function BloodPostView() {
  const [show, setShow] = useState(false);
  const [bloodPosts, setBloodPosts] = useState([]);
  let tokenSave = localStorage.getItem("token");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    axios
      .get(`/bloodpost/`, {
        headers: {
          Authorization: `Bearer ${tokenSave}`,
        },
      })
      .then((result) => {
        
        setBloodPosts(result.data.Data);
      })
      .catch((err) => console.log(err));
  }, []);
  
  useEffect(() => {
    axios
      .get(`/bloodpost/`, {
        headers: {
          Authorization: `Bearer ${tokenSave}`,
        },
      })
      .then((result) => {
        
        setBloodPosts(result.data.Data);
      })
      .catch((err) => console.log(err));
  }, [bloodPosts]);

  return (
    <div>
      <>
     
        
        < MdBloodtype id="breathing-button" className = "Flafelbtn"variant="success" onClick={handleShow}/>
        

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Blood Post Section</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {bloodPosts &&
              bloodPosts.map((elem, index) => {
                return (
                  <Card key = {index} style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={elem.img} />
                    <Card.Body>
                      <Card.Title>{elem.title}</Card.Title>
                      <Card.Text>{elem.descriptionn}</Card.Text>
                      
                    </Card.Body>
                  </Card>
                );
              })}
          </Offcanvas.Body>
        </Offcanvas>
      </>
    </div>
  );
}

export default BloodPostView;
