import React from 'react'
import './Leader.css';
import { FaHandHoldingMedical , FaMobileAlt } from 'react-icons/fa';
import {AiOutlineAreaChart , AiFillCar} from 'react-icons/ai';
import {FiUsers} from 'react-icons/fi';
import {RiSecurePaymentFill} from 'react-icons/ri';

function Leader() {
    return (
        <>
        
        <div className="features">


        <div className="title">
        <h1>The leader in online fundraising</h1>
        </div>
        <div className="containerr">
        <div className="feat">
            <FaHandHoldingMedical className='icons'/>
            <h5>QUALITY EQUIPMENT</h5>
            <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. expedita
            voluptatum, ipsum sit dolor exercitationem temporibus qui!
            </p>
        </div>
        <div className="feat">
            <FaMobileAlt className='icons'/>
            <h5>QUALITY EQUIPMENT</h5>
            <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. expedita
            voluptatum, ipsum sit dolor exercitationem temporibus qui!
            </p>
        </div>
        <div className="feat">
            <RiSecurePaymentFill className='icons'/>
            <h5>QUALITY EQUIPMENT</h5>
            <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. expedita
            voluptatum, ipsum sit dolor exercitationem temporibus qui!
            </p>
        </div>
        <div className="feat">
            <FiUsers className='icons'/>
            <h5>QUALITY EQUIPMENT</h5>
            <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. expedita
            voluptatum, ipsum sit dolor exercitationem temporibus qui!
            </p>
        </div>
        <div className="feat">
            <AiOutlineAreaChart className='icons'/>
            <h5>UNIQUE TO YOUR NEEDS</h5>
            <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. expedita
            voluptatum, ipsum sit dolor exercitationem temporibus qui!
            </p>
        </div>
        <div className="feat">
            <AiFillCar className='icons'/> 
            <h5>HEALTHY NUTRITION PLAN</h5>
            <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. expedita
            voluptatum, ipsum sit dolor exercitationem temporibus qui!
            </p>
        </div>
        </div>
  </div>
        </>
    )
}

export default Leader
