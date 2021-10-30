import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./EditFundraiser.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./YourFundraisers.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useHistory } from "react-router-dom";
import { AiFillCaretLeft } from "react-icons/ai";
import axios from "axios";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { storage } from "../../../../FireBase/FireBase";
// import { useDispatch, useSelector } from "react-redux";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const EditFundraiser = () => {
  let tokenSave = localStorage.getItem("token");
  const history = useHistory();
  const { id } = useParams();
  const [post, setPost] = useState();
  const [showbtnDelete, setShowbtnDelete] = useState(false);

  ///update post overview
  const [title, setTitle] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [targett, setTargett] = useState("");

  //update image
  // const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [toggle, setToggle] = useState(false);

  ///update story
  const [descriptionn, setDescriptionn] = useState("");

  useEffect(() => {
    axios
      .get(`/fundraiser/id/${id}`, {
        headers: {
          Authorization: `Bearer ${tokenSave}`,
        },
      })
      .then((result) => {
        setPost(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [toggle]);

  const softDelete = () => {
    console.log(tokenSave,"Mai token")
    axios
      .put(`/fundraiser/soft/delete/fundreiser/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${tokenSave}`,
        },
      })
      .then((result) => {
        history.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateFundraiserOverView = (e) => {
    e.preventDefault();
    axios
      .put(
        `/fundraiser/update/fundraiser/overview/${id}`,
        { title, phoneNumber, targett, country },
        {
          headers: {
            Authorization: `Bearer ${tokenSave}`,
          },
        }
      )
      .then((result) => {})
      .catch((err) => {
        console.log("err", err);
      });
  };

  const updateFundraiserStory = (e) => {
    e.preventDefault();
    axios
      .put(
        `/fundraiser/update/fundraiser/story/${id}`,
        {
          descriptionn,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenSave}`,
          },
        }
      )
      .then((result) => {})
      .catch((err) => {
        console.log("err", err);
      });
  };

  //   const handleChange = async(e) => {
  //     if (e.target.files[0]) {
  //       await   setImage(e.target.files[0]);
  //     }
  //     await  handleUpload()
  //   };

  const handleUpload = async (e) => {
    let image = e.target.files[0];
    const uploadTask = storage.ref(`/images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      async () => {
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

  const updateFundraiserImage = (e) => {
    e.preventDefault();
    axios
      .put(
        `/fundraiser/update/fundraiser/image/${id}`,
        {
          img: url,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenSave}`,
          },
        }
      )
      .then((result) => {})
      .catch((err) => {
        console.log("err", err);
      });
    setToggle(!toggle);
  };

  return (
    <div className="main-update">
      <div className="container">
        <button
          onClick={() => {
            history.goBack();
          }}
          className="back-button"
        >
          {" "}
          <AiFillCaretLeft /> Back
        </button>
        <div>
          {post &&
            post.map((elm, i) => {
              return (
                <div key={i} className="update-post-title">
                  <img src={elm.img} />
                  <div>
                    <h3>Edit & Settings</h3>
                    <p>{elm.title}</p>
                  </div>
                </div>
              );
            })}
        </div>
        <hr></hr>
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="overview" title="Overview">
            {post &&
              post.map((elm, i) => {
                return (
                  <div key={i} className="update-post-overview">
                    <Form onSubmit={updateFundraiserOverView}>
                      <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label>Title</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder={elm.title}
                            onChange={(e) => {
                              setTitle(e.target.value);
                            }}
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder={elm.phoneNumber}
                            onChange={(e) => {
                              setPhoneNumber(e.target.value);
                            }}
                          />
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label>Country</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder={elm.country}
                            onChange={(e) => {
                              setCountry(e.target.value);
                            }}
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                          <Form.Label> Goal</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder={elm.targett}
                            onChange={(e) => {
                              setTargett(e.target.value);
                            }}
                          />
                        </Form.Group>
                      </Row>

                      <button className="Save-update" type="submit">
                        Save
                      </button>
                    </Form>
                  </div>
                );
              })}
          </Tab>
          <Tab eventKey="photo" title="Photo">
            {post &&
              post.map((elm, i) => {
                return (
                  <div key={i} className="update-post-photo">
                    <img src={elm.img} />
                    <input type="file" onChange={handleUpload} />
                    {/* <button onClick={handleUpload} className="Save-update" type="submit">Upload Image</button> */}
                    <button
                      onClick={updateFundraiserImage}
                      className="Save-update"
                      type="submit"
                    >
                      Change
                    </button>
                  </div>
                );
              })}
          </Tab>
          <Tab eventKey="story" title="Story">
            {post &&
              post.map((elm, i) => {
                return (
                  <div key={i} className="update-post-story">
                    <div>
                      
                      <textarea className="form-control" type="text" id="exampleFormControlTextarea1" placeholder={elm.descriptionn}rows="3"   onChange={(e) => {
                          setDescriptionn(e.target.value);
                        }} maxLength="245" >
                          
                        </textarea>


                      <button
                        className="Save-update"
                        onClick={updateFundraiserStory}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                );
              })}
          </Tab>
        </Tabs>
        <div className="Delete-my-postinfo">
          <div>
            <h5>Delete my fundraiser</h5>
            <p>
              You will no longer have access to this fundraiser after deleting it.
              <br></br>
              If you've received donations, your donors will still be able to view
              a summary.
            </p>
          </div>

          <p
            onClick={() => {
              setShowbtnDelete(!showbtnDelete);
            }}
            className="btn-delete-post"
          >
            Delete
          </p>
        </div>

        {showbtnDelete && (
          <div class="model-delete-post">
            <div className="info-deleted">
              <AiOutlineCloseSquare
                className="close-pop"
                onClick={() => {
                  setShowbtnDelete(!showbtnDelete);
                }}
              />
              <div className="text-center">
                <h3>Delete your fundraiser</h3>
                <hr></hr>

                <p>
                  You will no longer have access to this fundraiser after
                  deleting it.
                </p>
                <button className="confirm-delete-post" onClick={softDelete}>
                  Delete fundraiser
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
