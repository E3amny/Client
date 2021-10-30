import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import './SearchResults.css';
import { storage } from "../../../FireBase/FireBase";
// import ProgressBar from "react-bootstrap/ProgressBar";
// import Pagination from 'react-bootstrap/Pagination';

export const SearchResults = () => {
  const [search, setSearch] = useState();
  const history = useHistory();

  const state = useSelector((state) => {
    return { text1: state.text1.text1 };
  });

  useEffect(async () => {
      
      const response = await axios.get(
        `/search?name=${state.text1}`
      );
      setSearch(response.data.search);
    
  }, [state.text1]);

  const ViewFundRaiser = (data) => {
    history.push(`/fundraiserView/${data.id}`);
  };

  // onClick={() => {
  //   ViewFundRaiser(data);
  // }}

  return (
    <div className="Main-search">
         <div className='container'>
           <p className='title-searchh'><strong>{search && search.length}</strong> Results for <strong>"{state.text1}"</strong> in all locations </p>
          <div className="row"> 
      {search &&
        search.map((data) => {
          return (
            <>
                <div onClick={()=>{ViewFundRaiser(data)}}
                    key={data.id}
                    className="col-lg-3 col-md-6"
                  >
                    <div className="search-contect">

                     <div className="img-contect">
                     <img src={data.img} alt="not found photo" />
                     </div>

                      <div className="title-search">
                        <p>{data.title}</p>
                      </div>
                      
                    </div>
                  </div>
            </>
          );
        })}
    </div>
    </div>
    </div>

  );
};
