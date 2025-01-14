import React from "react";
import banner1 from '../assets/banner1.jpg'
import banner2 from '../assets/banner2.jpg'
import banner3 from '../assets/banner3.jpg'
import banner4 from '../assets/banner4.jpg'
const Banner = () => {
  return (
    <div className="mt-8 md:mb-0 border w-full relative">
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src={banner1}
            className="w-full  md:h-[400px] h-[300px] lg:h-[500px] object-cover rounded-xl"
          />
          
          <div
            className="absolute mt-[50px] text-center ml-[10px] md:mt-[50px] md:ml-[100px] lg:mt-[150px] lg:ml-[400px]"
            data-aos="fade-down"
            data-aos-offset="200"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
          >
            
           <div className="flex mx-auto text-center border w-[100%]"><h3>sub heading</h3></div>
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src={banner2}
            className="w-full object-cover md:h-[400px] h-[300px] lg:h-[500px] rounded-xl"
          />
          <div className="absolute mt-[50px] text-center ml-[10px] lg:mt-[150px] lg:ml-[0px]">
            
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img
            src={banner3}
            className="w-full  object-cover md:h-[400px] lg:h-[500px]  h-[300px] rounded-xl"
          />
          <div className="absolute mt-[50px] text-center  lg:mt-[150px] lg:ml-[600px]">
             
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img
            src={banner4}
            className="w-full h-[300px] object-cover  md:h-[400px] lg:h-[500px] relative rounded-xl"
          />
          <div className="absolute lg:mt-[150px] lg:ml-[300px]">
             
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
