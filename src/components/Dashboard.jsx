import React, { useState} from 'react';
import  Spinner  from '../components/spinner.jsx';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAuth } from "../context/AuthContext"
import Navigation from './Navigation';
import { motion } from 'framer-motion/dist/framer-motion';
import "../styles/Dashboard.css"
import IstockImage1 from '../assets/images/istockphoto-527614583-1024x1024.jpg'
import IstockImage2 from '../assets/images/istockphoto-471204065-1024x1024.jpg'
import IstockImage3 from '../assets/images/istockphoto-959141970-1024x1024.jpg'
import IstockImages4 from '../assets/images/istockphoto-959146982-1024x1024.jpg'

let pictures = [
  // eslint-disable-next-line
  {id:1, url:IstockImage1},
  // eslint-disable-next-line
  {id:2, url:IstockImage2},
  // eslint-disable-next-line
  {id:3, url:IstockImage3},
  // eslint-disable-next-line
  {id:4, url:IstockImages4},
 ];

export default function Dashboard() {    
    const {currentUser, loading} = useAuth();

      const [currentIndex, setCurrentIndex] = useState(0);
      const [isOpen, setIsOpen] = useState(false);
      const handleClick = (index) => {
        setCurrentIndex(index);
        setIsOpen(true);
      }
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        // autoplay: true,
        // autoplaySpeed: 2000,
        // cssEase: "linear",
        afterChange: (index) => setCurrentIndex(index),
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              swipeToSlide: true,
              slidesToScroll: 1
            }
          }
        ]
      };

     console.log(currentUser)

  return loading ? (
    <Spinner/>
  ) :( 
    <div>
      <Navigation/>
      {!isOpen ? (
        
           <div className='pictures'>
            <Slider {...settings}>
          {pictures.map((picture, index) => (
            <motion.img
            className={'image'}
              key={picture.id}
              src={picture.url}
              whileHover={{ scale: 1.001 }}
              onClick={() => handleClick(index)}
            />
          ))}
           </Slider>
        </div>
       
       
      ) : (
        <div className='btn'>
          <motion.button 
          className={'btn1'}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsOpen(false)}
          >
            Close
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            onClick={() => setCurrentIndex(currentIndex - 1)}
            disabled={currentIndex === 0}
          >
            Previous
          </motion.button>
          <motion.img 
          className={'image1'}
            src={pictures[currentIndex].url}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5 }}
          />
           <p>{currentIndex + 1} of {pictures.length}</p>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            onClick={() => setCurrentIndex(currentIndex + 1)}
            disabled={currentIndex === pictures.length - 1}
          >
            Next
          </motion.button>
        </div>
      )}
    </div>  
  )
};

