import React from 'react';
import Banner from './Banner';
import TopSellingItems from './TopSellingItems';
import NewArrival from './NewArrival';
import TopSellingBrand from './TopSellingBrand';
import Service from './Service';

const Home = () => {
    return (
       <div>
        <Banner></Banner>
        <TopSellingItems></TopSellingItems>
        <NewArrival></NewArrival>
        <TopSellingBrand></TopSellingBrand>
        {/* <Service></Service> */}
       </div>
    );
};

export default Home;