import React , { useState, useEffect }from "react"
import './Footer.css';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {AiFillFacebook ,AiFillInstagram ,AiFillTwitterSquare} from 'react-icons/ai';

const Footer = () => {
    const history = useHistory();
const [getcategorys, setGetcategorys] = useState();
useEffect(() => {
    axios.get(`/fundraiser/categorys/categorys/categorys`).then((res)=>{
        setGetcategorys(res.data.allData); 
    }).catch((error)=>{
        console.log(error);
    })
    
  }, []);

  const cate = (id)=>{
      history.push(`/category/${id}`);
  }
    return(
        <footer className="page-footer">
        <div className="container">

            <div className="Main-footer">
                <div className="logo-footer">
                    <h5>Ed3amny</h5>
                    
                </div>


                <div className="categorys">   
                <h5>FUNDRAISE FOR</h5>
                <ul className="list-unstyled">
                     {getcategorys&&getcategorys.map((ele, index)=>{
                            return(
                                <li key = {index} onClick={()=>{cate(ele.id)}}> <a>{ele.namee}</a></li>
                            )
                        })}
                </ul>
            
                </div>


                <div className="option">
                    <h5>Resources</h5>
                    <ul className="list-unstyled">
                    <li>Help Center</li>
                    <li>Blog</li>
                    <li>Ed3amny Stories</li>
                    <li>Press Center</li>
                    
                </ul>
                </div>
            </div>
            
    

        <div className="copy-footer">
            <div>
            © 2021 Copyright: 
            <a href="#!"> Ed3amny</a>
            </div>
            <div className='icon-footer'>
               <AiFillFacebook className='facebook'/>
               <AiFillTwitterSquare className='facebook'/>
               <AiFillInstagram/>
            </div>
        </div>
        </div>
    </footer>
    )
}
export default Footer