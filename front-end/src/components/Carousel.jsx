import React from "react";
import Slider from "react-slick";
import "./pages/Home.css";
import help1 from "../assets/images/help1.jpg";
import help2 from "../assets/images/help2.jpg";
import help3 from "../assets/images/help3.jpg";
import help4 from "../assets/images/help4.jpg";
import help5 from "../assets/images/help5.jpg";


const ImageCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div>
          <img src={help1} alt="Help 1" className="carousel-image" />
        </div>
        <div>
          <img src={help2} alt="Help 2" className="carousel-image" />
        </div>
        <div>
          <img src={help3} alt="Help 3" className="carousel-image" />
        </div>
        <div>
          <img src={help4} alt="Help 4" className="carousel-image" />
        </div>
        <div>
          <img src={help5} alt="Help 5" className="carousel-image" />
        </div>
      </Slider>
    </div>
  );
};

export default ImageCarousel;