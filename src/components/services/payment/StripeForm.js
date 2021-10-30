import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import './Donation.css';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';


import {AiOutlineExclamation} from 'react-icons/ai';

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#000000",
      color: "#000000",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "26px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#000000" },
      "::placeholder": { color: "#000000" },
    },
    invalid: {
      iconColor: "#000000",
      color: "#000000",
    },
  },
};

export const StripeForm = () => {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const [errmessage, setErrmessage] = useState('');
  const elements = useElements();
  const user_id = localStorage.getItem("CurrentUserId")
  
const state2 = useSelector((state) => {
    
  return { amount: state.amount.amount };
});
const state3 = useSelector((state) => {
    
  return { postId: state.postId.postId };
});

const state1 = useSelector((state) => {
    
  return { title: state.title.title };
});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
  
    if (!error) {
      try {
        const d = new Date().toISOString().substr(0, 19).replace('T', ' ');
        // const date = `${d.getFullYear()}-${d.getMonth() + 2}-${d.getDate()}`
        // console.log(date,"date date")
        const { id } = paymentMethod;
        const response = await axios.post("/payment", {
          id,
          amount:state2.amount*100, 
          campaign_id : state3.postId,
          userId:user_id,
          created_at:d,
          title:state1.title
        });
        if (response.data.success) {
          console.log("succ payment",response.data.success)
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      if(error.code == 'incomplete_number'){
        console.log("Erro" , error);
        setErrmessage("Your card number is incorrect");
      }
    }
  };

  

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset>
            <div>
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
                 {/** */}
                 <Container className="main-Error">
                {errmessage && errmessage.length > 0 ? [
                'danger'
                ].map((variant, idx) => (
                <Alert key={idx} variant={variant} className='Alert-login'>

                <AiOutlineExclamation className='Error-Login'/> {errmessage}
                </Alert>
                )) : ""}

          </Container>

            {/** */}
          <button className='donate'>DONATE NOW</button>
        </form>
      ) : (
        <div>
          <h2 className='donate-done'>Thank You For Your Donation</h2>
        </div>
      )}
    </>
  );
};

