import React, { useEffect, useState } from "react";
// import OwlCarousel from "react-owl-carousel";
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Genre from "../genre/genre";
import "./genres.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red", color: "black" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
}

const Genres = (props) => {
  const [genres, setGenres] = useState(props.genres);

  useEffect(() => {
    setGenres(props.genres);
  }, [props.genres]);

  // useEffect(() => {
  // setCategories(props.categories);
  // fetch("http://localhost:8080/categories", {
  //   method: "GET"
  // })
  //   .then(res => {
  //     if (res.status !== 200) throw new Error("failed to fetch categories");
  //     return res.json();
  //   })
  //   .then(resData => {
  //     setCategories(resData.categories);
  //   })
  //   .catch(catchError);
  // }, []);

  let settings = {
    slidesToShow: 4,
    swipeToSlide: false,
    dragToSlide: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div>
      <div className="genres_div">
        <Slider {...settings}>
          {genres.map((genre) => (
            <Genre key={genre.name} _id={genre._id} genreName={genre.name} />
            // <Genre
            //   activeGenreHandler={props.activeGenreHandler}
            //   key={genre.name}
            //   genreName={genre.name}
            // />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Genres;
