import React from 'react'
import { useHistory } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './ReadyToStart.css';
import { useSelector } from "react-redux";

const ReadyToStart = ()=> {
    const history = useHistory();
    const state1 = useSelector((state) => {
        return { token: state.token_1.token };
    });
    
        const sendToFundraiser = ()=>{
            if(state1.token){
                history.push('/fundraiser')
            }else{
                history.push('/signup')
            }
        }
    
    return (
        <div className="ready-start">
        <div className="container text-center">
            <h3>Ready to start fundraising?</h3>
            <button type="button" onClick={sendToFundraiser}>Ed3amny now</button>            
        </div> 
        </div>
    )
}

export default ReadyToStart
