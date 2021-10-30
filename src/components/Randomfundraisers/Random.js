import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";
import { useHistory } from "react-router";
import "./Random.css";
import { AiFillCaretRight } from "react-icons/ai";

function Random() {
  const history = useHistory();
  const [random, setRandom] = useState();
  useEffect(() => {
    axios
      .get(
        `/fundraiser/get/getTopFundraiserByCurrentTarget`
      )
      .then((res) => {
        setRandom(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const ViewFundRaiser = (data) => {
    history.push(`/fundraiserView/${data.id}`);
  };
  return (
    <>
      <div className="Main-Topfundraiser">
        <div className="container">
          <h2>Find a random fundraiser</h2>
          <div className="row">
            {random &&
              random.map((data) => {
                return (
                  <div
                    key={data.id}
                    className="col-lg-4 col-md-12"
                    onClick={() => {
                      ViewFundRaiser(data);
                    }}
                  >
                     {/* Mother of all */}
                    <div className="mainViewfundraiser">{/* height 800px */}
                    <div className="ImageDev">
                      <img src={data.img} alt="no photo found" />
                      </div>

                      <div className="mainViewfundraiserText">

                      <div className="TitleDev"> {/* height 100px */}
                        <h5>{data.title}</h5>
                        </div>
                        <div className="DescriptionDev">{/* height 200px */}
                        <p>{data.descriptionn.substring(0,255)} ...</p>
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
          <p
            className="see-more-fundraiser"
            onClick={() => history.push("/allfundraiser")}
          >
            See More <AiFillCaretRight />{" "}
          </p>
        </div>
      </div>
    </>
  );
}

export default Random;
