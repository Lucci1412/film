import React,{useEffect,useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { publicRequest } from "../../commons/api";
import "./style.scss";
import { EffectCoverflow, Autoplay, Navigation } from "swiper";

function Slider() {
  const [movies, setMovies] = useState(null);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await publicRequest.get(`movie/trailer?limit=${10}`)
        if(res.data.success){
          setMovies(res.data.movies);
        }
       
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  },[]);
 
  return (
    <>
      {movies && <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
        navigation={true}
        loop={true}
        modules={[EffectCoverflow, Autoplay, Navigation]}
        className="mySwiper"
      >
        {movies.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Link to={`/phim/${item.slug}`} className="slider_movie">
                  <div className="trailer">Sắp chiếu</div>
                  <img
                    src={item.poster_url||item.thumb_url}
                    alt="Thumb Movie"
                  />
                  <div className="slider_info">
                    <h4>{item.name}</h4>
                    <span>{item.origin_name}</span>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
      </Swiper>}
    </>
  );
}

export default Slider;
