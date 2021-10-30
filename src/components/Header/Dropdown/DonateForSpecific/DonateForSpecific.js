import React , { useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import axios from "axios";


function DonateForSpecific() {
    const history = useHistory();
    const [cate, setCate] = useState();
    useEffect(() => {
        axios.get(`/helpSpecific`).then((res)=>{
      
             setCate(res.data.result); 
        }).catch((error)=>{
            console.log(error);
        })
        
      }, []);
      

    return (
        <div>
        {[DropdownButton].map((DropdownType, index) => (
      <DropdownType
        as={ButtonGroup}
        key={index}
        id={`dropdown-button-drop-${index}`}
        size="sm"
        variant="none"
        title="Hospitals to donate for "
      >
        {cate&&cate.map((ele)=>{
            return(
                 <div>
                     <Dropdown.Item>{ele.namee}</Dropdown.Item>

                 </div>
            )
        })}
        <Dropdown.Divider />
        <Dropdown.Item eventKey="4" className='see-all-hospitals'>See all Hospitals</Dropdown.Item>
      </DropdownType>
    ))}
        </div>
    )
}


export default DonateForSpecific