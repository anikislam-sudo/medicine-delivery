import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

import classes from "./Testimonial.module.css";
import img1 from "../../assets/Testimonial/image1.png";
import img2 from "../../assets/Testimonial/image2.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Image from "next/image";

const Testimonial = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const testimonialData = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      image: img1,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in tincidunt. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu.",
    },
    {
      name: "Michael Chen",
      role: "CTO, TechNova",
      image: img2,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in tincidunt. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu.",
    },
    {
      name: "Emily Rodriguez",
      role: "Founder, Bloom Boutique",
      image: img1,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in tincidunt. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu.",
    },
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      image: img2,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in tincidunt. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu.",
    },
    {
      name: "Michael Chen",
      role: "CTO, TechNova",
      image: img1,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in tincidunt. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu.",
    },
    {
      name: "Emily Rodriguez",
      role: "Founder, Bloom Boutique",
      image: img2,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in tincidunt. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu.",
    },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <h2>What Our Clients Say About Us</h2>
        <div className={classes.underline}></div>
      </div>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1.5}
        spaceBetween={50}
        initialSlide={1}
        coverflowEffect={{
          rotate: 0,
          stretch: 80,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{
          clickable: true,
          el: `.${classes.paginationContainer}`,
          bulletClass: classes.paginationBullet,
          bulletActiveClass: classes.paginationBulletActive,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className={classes.swiper}
      >
        {testimonialData.map((testimonial, index) => (
          <SwiperSlide key={index} className={classes.swiperSlide}>
            <div className={classes.testimonialCard}>
              <Image
                src={testimonial.image}
                alt={`${testimonial.name} testimonial`}
                height={296}
                width={245}
                className={classes.testimonialImage}
              />
              <div className={classes.testimonialContent}>
                <div className={classes.testimonialDate}>May 8, 2020</div>
                <h4 className={classes.testimonialTitle}>
                  {testimonial.title}
                </h4>
                <p className={classes.testimonialText}>{testimonial.text}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={classes.paginationContainer}></div>
    </div>
  );
};

export default Testimonial;
