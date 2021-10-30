import React from 'react'
import './AboutUs.css';
import "bootstrap/dist/css/bootstrap.min.css";
const AboutUs = () => {
    return (
        <>
    <section className="about" id="about">
        <div className="container">
            <div className="content">
                <div className="column col-left ">
                    <div className="img-card">
                        <img src="https://www.virginiafamilymed.com/wp-content/uploads/2015/05/unused-family-hero.jpg" className="" alt="image"/>
                    </div>
                </div>
                <div className="column col-right">
                <h3 className="content-title"> About Ed3amny</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, praesentium veritatis facere hic sequi dolorem adipisci, aspernatur dignissimos enim facilis quidem aliquid voluptatem pariatur exercitationem suscipit dicta. Officia voluptatem nesciunt deserunt 
                </p>
                <button className="button">Read More</button>
                </div>
            </div>
            </div>
        </section>
        </>
    )
}

export default AboutUs
