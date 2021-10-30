import React , { useState, useEffect }from 'react'
import { useParams ,useHistory } from "react-router-dom";
import './MainPage.css';
import axios from 'axios';
const ViewPost = ()=> {
    const history = useHistory();
    const [post, setPost] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:5000/admin/manger/view/post/dashbord/${id}`).then((res) => {
            setPost(res.data.result);
        }).catch((err) => {
            console.log(err);
        })
    },[])
    return (
        <>
        <div className="Main-view-by-id">
            {post&&post.map((ele)=>{
                return(
                    <div className='viewpost'>
                        <img src={ele.img}/>
                        <h3>{ele.title}</h3>
                        <p>{ele.descriptionn}</p>
                        <div className='info-post'>
                        <span> Target : {ele.targett}</span>
                        <span className=''>Country : {ele.country}</span>    
                        </div>
                        <button className='btn-back-dashbord' onClick={()=>{history.push('/admin')}}>Back</button> 
                    </div>
                )
            })}
        </div>
        </>
    )
}

export default ViewPost
