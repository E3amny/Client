import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./CategoryByType.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useSelector } from "react-redux";

function CategoryByType() {
  const history = useHistory();
  const { id } = useParams();
  const [cate, setCate] = useState();
  const [categoryname, setCategoryname] = useState();
  const state1 = useSelector((state) => {
    return { token: state.token_1.token };
  });

  const sendToFundraiser = () => {
    if (state1.token) {
      history.push("/fundraiser");
    } else {
      history.push("/signup");
    }
  };

  useEffect(() => {
    axios
      .get(
        `/fundraiser/category/categorys/categorys/${id}`
      )
      .then((res) => {
        setCategoryname(res.data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`/fundraiser/typee/${id}`)
      .then((res) => {
        setCate(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  const handleFundraiser = (fundId) => {
    history.push(`/fundraiserView/${fundId}`);
  };

  return (
    <div className="Main-Topfundraiser">
      <div className="container">
        <div className="row category-name-section">
          {categoryname &&
            categoryname.map((category, index) => {
              return (
                <>
                  <div className="col-lg-6" key={index}>
                    <h3>{category.namee}</h3>

                    <h5>{category.title}</h5>

                    <p>{category.decc}</p>

                    <button onClick={sendToFundraiser}>Ed3amny Now</button>
                  </div>
                  {/**Right Section */}

                  <div className="col-lg-6">
                    <img src={category.img} />
                  </div>
                </>
              );
            })}
        </div>
        <hr></hr>
        <div className="row">
          {cate &&
            cate.map((data, index) => {
              return (
                <div
                  key={index}
                  className="col-lg-4 col-md-12"
                  onClick={() => handleFundraiser(data.id)}
                >
                  <div className="mainViewfundraiser">
                    <img src={data.img} alt="Photo not found" alt="NOT FOUND" />
                    <div className="mainViewfundraiserText">
                    <div className="TitleDev"> {/* height 100px */}
                      <h5>{data.title}</h5>
                      </div>
                      <div className="DescriptionDev">{/* height 200px */}
                      <p>{data.descriptionn}</p>
                      </div>
                      <div className='progressbar'>
                      <ProgressBar
                        variant="success"
                        now={Math.round(
                          (data.current_target / data.targett) * 100
                        )}
                      />
                      <span className="raised">
                        ${data.current_target} raised of
                      </span>{" "}
                      <span>${data.targett}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default CategoryByType;
