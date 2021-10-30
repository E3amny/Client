import React , { useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import axios from "axios";
import './Categories.css';

function Categories() {
    const history = useHistory();
    const [cate, setCate] = useState();
    useEffect(() => {
        axios.get(`/fundraiser/categories/categories`).then((res)=>{
            setCate(res.data.allData); 
        }).catch((error)=>{
            console.log(error);
        })
        
      }, []);
      const categoriesPush = (id)=>{
          history.push(`/category/${id}`);
      }
    return (
        <div>
        {[DropdownButton].map((DropdownType, idx) => (
      <DropdownType
        as={ButtonGroup}
        key={idx}
        id={`dropdown-button-drop-${idx}`}
        variant="none"
        title="Categories"
        className="dropdown-NavBar"
      >
        {cate&&cate.map((ele,index)=>{
            return(
                 <div key = {index}>
                     <Dropdown.Item onClick={()=>{categoriesPush(ele.id)}}>{ele.namee}</Dropdown.Item>
                 </div>
            )
        })}
        <Dropdown.Divider />
        <Dropdown.Item eventKey="4" className='see-all-categories' onClick={()=>{history.push('/category/allCategory/Category')}} >See All</Dropdown.Item>
      </DropdownType>
    ))}
        </div>
    )
}

export default Categories
