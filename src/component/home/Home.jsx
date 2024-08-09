import React from 'react';
import Banner from './Banner';
import TopSellingItems from './TopSellingItems';
import NewArrival from './NewArrival';

const Home = () => {
    return (
       <div>
        <Banner></Banner>
        <TopSellingItems></TopSellingItems>
        <NewArrival></NewArrival>
       </div>
    );
};

export default Home;