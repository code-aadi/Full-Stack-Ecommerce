import React from 'react'


import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';


const Home = () => {
  return (
     <>
        <HeroBanner />
        <Categories />
        <FeaturedProducts />
    </>
  )
}

export default Home
