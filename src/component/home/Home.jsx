import React from 'react';
import Banner from './Banner';
import TopSellingItems from './TopSellingItems';
import Carosel from './Carosel';

const Home = () => {
    return (
       <div>
        <Banner></Banner>
        <TopSellingItems></TopSellingItems>
        <Carosel></Carosel>
       </div>
    );
};

export default Home;