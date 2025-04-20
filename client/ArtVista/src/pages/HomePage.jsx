import React from 'react';
import Navbar from '../components/Navbar';
import WelcomeText from '../components/WelcomeText';
import Cards from '../components/Cards';
import FeaturedArtworks from '../components/FeaturedArtworks';
import TopRatedArtist from '../components/TopRatedArtist';
import Footer from '../components/Footer';


function HomePage() {
  return (
    <div className=" bg-black text-white m-0 p-0 w-full h-screen overflow-y-auto">
      <Navbar  />
      <WelcomeText title='ARTVISTA' subtitle='WHERE CREATIVITY MEETS CONNECTION' />
      <Cards />
      <FeaturedArtworks />
      <TopRatedArtist />
      <Footer />
    </div>
  );
}

export default HomePage;