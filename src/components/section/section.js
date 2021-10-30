import React ,{useState}from 'react'
import './section.css';
import imgheader from './img/image (2).png';
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import { AiFillCaretRight ,AiOutlineCloseSquare} from "react-icons/ai";
import { useSelector } from "react-redux";

function Section() {
const [showVideo, setShowVideo] = useState(false);
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
        <div className="Main-section">
        <div className="container">
            <div className="row">

                <div className="col-md-6 col-sm-12 text-header">
                    <h2>Trusted fundraising for all of life's moments</h2>
                    <h5 className="text-secondary">Get help. Give kindness. Start in just 5 minutes.</h5>
                    <div className='row btn-option'>
                        <div className='col-md-6'>
                            <button onClick={sendToFundraiser} className='btn-success p-2 btn-Start'>Ed3amny now</button>
                        </div>
                        <div className='col-md-6 video-section'>
                            <AiFillCaretRight className='video-show' onClick={()=>{setShowVideo(!showVideo)}}/>
                            <p>See how Ed3amny works</p>
                        </div>
                    </div>
                    {showVideo && (<div className='pop-fundraiser'>
                        <div className='vidoss-view'>
                            <AiOutlineCloseSquare className='close-pop' onClick={()=>{setShowVideo(!showVideo)}}/>
                            <iframe width="98%" height="100%" src="https://www.youtube.com/embed/EVkA8WWMCss" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        
                    </div>)}
                    

                </div>
                <div className="col-md-6 col-sm-12">

                    <img src={imgheader} alt='not found img '/>
                </div>
            </div>
            
        </div>
        </div>
    )
}

export default Section

