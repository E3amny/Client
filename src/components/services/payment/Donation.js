import React , { useState }from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Donation.css";
import { AiFillCaretLeft, AiFillDollarCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Stripe from "../../services/payment/Stripe";
import {setAmount } from "../../../reducers/Donation/AmountReducer"
// import { Label } from "semantic-ui-react";
const Donation = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [errmessage, setErrmessage] = useState('')
  
  const state = useSelector((state) => {
    return { img: state.img.img };
  });
  const state1 = useSelector((state) => {
    return { title: state.title.title };
  });
  const state2 = useSelector((state) => {
    return { amount: state.amount.amount };
  });

  const back = () =>{
    history.goBack();
  }
  
  return (
    <div className="main-donation">
      <div className="container">
        <div className="row">
          <div className="col-lg-9 info-donation">
            <button className="button-go-back" onClick={back}>
              <AiFillCaretLeft /> Return
            </button>
            <hr></hr>
            <div className="image-title-container">
              <img src={state.img} />
              <p>You're supporting <strong>{state1.title}</strong></p>
            </div>
            <h6>Enter your donation</h6>
            <div className="dollar-right">
              <input required
                type="number"
                dir="rtl"
                onChange={(e) => {
                  dispatch(setAmount(e.target.value ));
                }}
              ></input>
              <AiFillDollarCircle className="dollar-icon" />
            </div>
            <hr></hr>
     
            <Stripe />
            <p>
              Tip Ed3amny Services
              We have pre-set a 10% contribution for Ed3amny. Your contribution helps us provide a safe and reliable fundraising service. You can select a different percentage from the drop-down menu or eliminate this contribution by clicking on the link below.
            </p>
            <hr></hr>

          </div>
          <div className="col-lg-3">
              <div className='amount-donation'>
                  <p className='title-donation'>Your donation</p>
                  <div className='amount-donation-right'>
                      
                       <p>Your donation</p>
                       <p>${state2.amount}</p>
                      

                  </div>
                  <hr></hr>
                  <div className='total-donation'>
                       <p>Total due today</p>
                       <p> ${state2.amount} </p>
                  </div>

              </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation;
