import React from 'react'


import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';
import BrandSlider from '../components/BrandSlider';
import PromoBanner from '../components/PromoBanner';
import DealsOfTheDay from '../components/DealsOfTheDay';
import FeaturesRibbon from '../components/FeaturesRibbon';


const Home = () => {
  return (
     <>
   
        <HeroBanner />
        <Categories />
        <FeaturedProducts />
        <PromoBanner />
        <DealsOfTheDay />
        <BrandSlider />
        <FeaturesRibbon />
    </>
  )
}

export default Home
