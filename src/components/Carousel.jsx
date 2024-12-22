// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Slide from './Slide'

import bgimg1 from '../assets/Images/coder-image1.jpg'
import bgimg2 from '../assets/Images/coder-image2.jpg'
import bgimg3 from '../assets/Images/coder-image3.jpg'

export default function Carousel() {
  return (
      <div className=" px-3 py-6 mx-auto">
          <Swiper
              spaceBetween={30}
              centeredSlides={true}
              loop={true}
              autoplay={{
                  delay: 5000,
                  disableOnInteraction: false
              }}
              pagination={{
                  clickable: true
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper">
              <SwiperSlide>
                  <Slide image={bgimg1} text="Find and Borrow Books Easily with Our System" />
              </SwiperSlide>
              <SwiperSlide>
                  <Slide image={bgimg2} text="Unlock the World of Knowledge and Enjoy Reading" />
              </SwiperSlide>
              <SwiperSlide>
                  <Slide image={bgimg3} text="Discover Your Next Great Read in Our Library Today" />
              </SwiperSlide>
          </Swiper>
      </div>
  );
}
