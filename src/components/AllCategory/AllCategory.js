import React, { useState, useEffect } from "react";
import "./AllCategory.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiFillCaretLeft } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";

const AllCategory = () => {
  const history = useHistory();
  const [category, setCategory] = useState();
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

  
  useEffect(() => {
    axios
      .get(`/fundraiser/categorys/categorys/categorys`)
      .then((res) => {
        setCategory(res.data.allData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const categoryHandler = (id) =>{
    history.push(`/category/${id}`)
  }

  return (
    <div className="Main-all-category">
      <div className="container">
        <div className="Back-To-Home">
          <span
            className="back-home"
            onClick={() => {
              history.push("/");
            }}
          >
            {" "}
            <AiFillCaretLeft /> Home{" "}
          </span>

          <h1>Start a Fundraiser</h1>
          <h6>
            People around the world are raising money for what they are
            passionate about.
          </h6>
          <button
            type="button"
            onClick={sendToFundraiser}
          >
            Ed3amny Now
          </button>
        </div>

        {/** Fundraising categories */}

        <div className="Fundraising-categories">
          <h3>Fundraising categories</h3>

          <div className="row viewCategory">
            {category &&
              category.map((element, index) => {
                return (
                  <div key={index} className="col-lg-4" onClick={()=>categoryHandler(element.id)}>
                    {/* <img src={element.img}/>
                                        <div>
                                        <h6>{element.namee}</h6>
                                        </div> */}
                    <Card>
                      <Card.Img variant="top" src={element.img} />
                      <Card.Body>
                        <Card.Text>{element.namee}</Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AllCategory;
