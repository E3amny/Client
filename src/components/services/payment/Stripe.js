import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {StripeForm} from './StripeForm'


const PUBLIC_KEY = 'pk_test_51Jilk5Aubu1iOJZcrPVBGALz0UdTabAaTl2E23rcj2cX5XfDwuZ2s2UevchQvE3naL648brIl5atrwg6xkdsgD4i00UFkRdXmQ'
const stripePromiseTest = loadStripe(PUBLIC_KEY)
const Stripe = () => {
     return (
         <Elements stripe={stripePromiseTest}>
             <StripeForm/>
         </Elements>
     )
}

export default Stripe