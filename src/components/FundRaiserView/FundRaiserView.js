import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import axios from "axios";
import "./FundRaiserView.css";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Share from "../services/Share/shareViaFacebook";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useDispatch } from "react-redux";
import { setImage } from "../../reducers/Donation/ImageReducer";
import { setTitle } from "../../reducers/Donation/TitleReducer";
import { setPostId } from "../../reducers/Donation/PostId";
import { useLocation } from "react-router";
import {BsCurrencyDollar} from 'react-icons/bs';
import { FaHandHoldingMedical, FaMobileAlt } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";
import {
  AiOutlineDownload,
  AiOutlineMoneyCollect,
  AiOutlineCloseSquare,
} from "react-icons/ai";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import Button from "react-bootstrap/Button";
// import Stripe from "../services/payment/Stripe";
// import Card from "react-bootstrap/Card";

const FundRaiserView = () => {
  let tokenSave = localStorage.getItem('token')
  const [sharePopup, setSharePopup] = useState(false);
  const [contributors, setContributors] = useState();
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [showAllDonate, setShowAllDonate] = useState(false);
  const [fundRaiserView, setFundRaiserView] = useState([]);
  let path = `https://ed3amny.herokuapp.com${location.pathname}`;
  const [allContributors, setAllContributors] = useState();

  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // const openSharePopup = () => {
  //   setSharePopup(true);
  // };
  // const exit = () => {
  //   setSharePopup(false);
  // };
  useEffect(() => {
    axios
      .get(`/Contribution/contributors/${id}`,{headers: {
        Authorization: `Bearer ${tokenSave}`}})
      .then((result) => {
        setContributors(result.data.result);
      })
      .catch((err) => console.log(err));
  }, [contributors]);

  useEffect(() => {
    axios
      .get(`/fundraiser/id/${id}`)
      .then((res) => {
        setFundRaiserView(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  useEffect(() => {
    axios.get(`/Contribution/allcontribution/${id}`).then((res) => {
      setAllContributors(res.data.result);
    }).catch((err) => {
      console.log(err);
    })
  },[])

  const senderr = (title, img) => {
    dispatch(setTitle(title));
    dispatch(setImage(img));
    dispatch(setPostId(id));
    history.push("/donation");
  };
  const handleCategory = (cateId) => {
    history.push(`/category/${cateId}`);
  };
  return (
    <>
      <div className="container">
        <div className="MainSectionFundRaiserView">
          {sharePopup && (
            <div className="pop-fundraiser">
              <div className="pop-fundraiser-child">
                <AiOutlineCloseSquare
                  className="close-pop"
                  onClick={() => {
                    setSharePopup(!sharePopup);
                  }}
                />
                <h1>Help by sharing</h1>
                <p>
                  Fundraisers shared on social networks raise faster, up to 5x
                  more!
                </p>
                <hr></hr>
                <Share />
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder={path}
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                  <InputGroup.Text
                    id="basic-addon2"
                    onClick={() => {navigator.clipboard.writeText(path)}}
                  >
                    Copy
                  </InputGroup.Text>
                </InputGroup>
              </div>
            </div>
          )}

          <div className="row">
            {fundRaiserView &&
              fundRaiserView.map((elem, index) => {
                return (
                  <>
                    {/* left section*/}
                    <div key={index} className="col-lg-8">
                      <h2 className="title-fundRaiserView">{elem.title}</h2>
                      <img src={elem.img} />
                      <div className="context-text-funRaiserView">
                        <p className="create-fundRaiserView">
                          {/* Created : {elem.created_at}{" "} */}
                          <p onClick={() => handleCategory(elem.typee)}>
                            {elem.namee}
                          </p>
                        </p>
                        <p> {elem.descriptionn} </p>

                        <hr></hr>
                      </div>

                      <div className="content">{/* <Stripe /> */}</div>
                    </div>

                    {/* right section*/}
                    <div className="col-lg-4">
                      <div className="donation-fundRaiserView">
                        <span className="target">${elem.current_target}</span>{" "}
                        <span> raised of ${elem.targett} goal</span>
                        <ProgressBar
                          variant="success"
                          now={Math.round(
                            (elem.current_target / elem.targett) * 100
                          )}
                        />
                        <button
                          className="share-fundRaiserView"
                          onClick={() => {
                            setSharePopup(!sharePopup);
                          }}
                        >
                          {" "}
                          <AiOutlineDownload className="share-facebook" /> Share
                        </button>
                        <button
                          className="share-donate"
                          onClick={() => senderr(elem.title, elem.img)}
                        >
                          {" "}
                          <BsCurrencyDollar className="share-facebook" />{" "}
                          Donate now
                        </button>

                        <button onClick={()=>{setShowAllDonate(!showAllDonate)}}className="all-donate">See donations</button>
                        {showAllDonate && (
                          <>
                                 <div className="pop-fundraiser">
              <div className="pop-fundraiser-child-donate">
                <AiOutlineCloseSquare
                  className="close-pop" onClick={() =>{setShowAllDonate(!showAllDonate)}}/>
                  <h5>Donations ({allContributors.length})</h5>
                  <button className='share-donate' onClick={() => history.push("/donation")}> Donate now</button>
                  <hr></hr>
                  {allContributors.length === 0 ? <>
                  <div className="no-fundraisers">
                  There's no donations for this fundraiser
                  </div>

                  
                  </> : (<div className='Main-title-contributors'>
                  {allContributors&&allContributors.map((ele)=>{
                    return (
                      
                      <div key={index} className="title-contribut">
                      <img src="https://www.gofundme.com/static/media/DefaultAvatar.4bb188e1d41df75419450a820a958679.svg"/>

                      <div className="price-user">
                        <p>
                          Amount Donated :
                          <strong> ${ele.amount / 100}</strong>
                        </p>
                        <p>
                          Donnor:{" "}
                          <strong>
                            {" "}
                            {ele.firstName} {ele.lastName}
                          </strong>
                        </p>
                        <p>
                          Created at:{" "}
                          <strong>
                            {" "}
                            {ele.created_at} 
                            </strong>
                          
                        </p>

                        <hr></hr>
                      </div>
                    </div>
                      
                    )
                  })}
                  
                  </div>)}
              </div>
            </div>
                          
                          </>
                          
                        )}

                      </div>
                      <div className="contributors-title">
                        <h5 className="text-uppercase">
                          Donors ({contributors && contributors.length})
                        </h5>
                        {contributors &&
                          contributors.map((elem, index) => {
                            return (
                              <div key={index} className="contribut">
                                <img src="https://www.gofundme.com/static/media/DefaultAvatar.4bb188e1d41df75419450a820a958679.svg" />

                                <div className="price-user">
                                  <p>
                                    Amount Donated :
                                    <strong> ${elem.amount / 100}</strong>
                                  </p>
                                  <p>
                                    Donnor:{" "}
                                    <strong>
                                      {" "}
                                      {elem.firstName} {elem.lastName}
                                    </strong>
                                  </p>

                                  <hr></hr>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
        {/* <div className="features">
          <div className="containerr">
            <div className="feat">
              <FaHandHoldingMedical className="icons" />
              <h5>QUALITY EQUIPMENT</h5>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                expedita voluptatum, ipsum sit dolor exercitationem temporibus
                qui!
              </p>
            </div>
            <div className="feat">
              <FaMobileAlt className="icons" />
              <h5>QUALITY EQUIPMENT</h5>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                expedita voluptatum, ipsum sit dolor exercitationem temporibus
                qui!
              </p>
            </div>
            <div className="feat">
              <RiSecurePaymentFill className="icons" />
              <h5>QUALITY EQUIPMENT</h5>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                expedita voluptatum, ipsum sit dolor exercitationem temporibus
                qui!
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default FundRaiserView;
