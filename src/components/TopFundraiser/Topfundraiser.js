import React , {useState , useEffect} from 'react'
import axios from 'axios';
import './Topfundraiser.css';
import "bootstrap/dist/css/bootstrap.min.css";
import  ProgressBar  from 'react-bootstrap/ProgressBar';
import { useHistory } from "react-router-dom";


 const Topfundraiser = () => {
     const [result, setResult] = useState();
     const history = useHistory();
    useEffect(() => {
        axios.get(`/fundraiser/getTopFundraiserByCurrentTarget`).then((result) => {
            setResult(result.data.result);
        }).catch((err) => {
            console.log(err);
        },)
      },[]);

      const ViewFundRaiser = (data) => {
        history.push(`/fundraiserView/${data.id}`);
    }
   
    return (
        <>
        <div className="Main-Topfundraiser">
            <div className="container">
                <h2>Top fundraisers</h2>
                <div className="row">
            {result &&
                result.map((data) => {
                    
                return <div key = {data.id} onClick={()=>{ViewFundRaiser(data)}} className="col-lg-4 col-md-12">
                    
                     {/* Mother of all */}
                    <div className="mainViewfundraiser"> {/* height 800px */}
                       <div className="ImageDev"> {/* height 400px */}
                        <img src={data.img} alt='not found photo'/>
                        </div>
                        <div className="mainViewfundraiserText">
                            
                            <div className="TitleDev"> {/* height 100px */}
                            <h5>{data.title}</h5>
                            </div>
                            <div className="DescriptionDev">{/* height 200px */}
                            <p>{data.descriptionn}</p>
                            </div>
                            {/* height 50px   if needed add dev we will see*/}
                            <div className='progressbar'>
                            <ProgressBar variant="success" now={Math.round((data.current_target / data.targett) * 100)}/>
                            <span className="raised">${data.current_target} raised of</span> <span>${data.targett}</span>
                            </div>
                        </div>
                    </div>
                     </div>;
                })}
                </div>
            </div>
        </div>
            
        </>
    )
}

export default Topfundraiser;
