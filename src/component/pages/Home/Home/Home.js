import React from 'react';
import Footer from '../../../shared/Footer/Footer';
import Navbar from '../../../shared/Navbar/Navbar';
import Banner from '../Banner/Banner';
import BookService from '../BookService/BookService';
import HomeHeaders from '../HomeHeader/HomeHeaders';

const Home = () => {
    return (
        <div> 
            <Navbar></Navbar>
            <Banner></Banner>
            <HomeHeaders></HomeHeaders>
            <BookService></BookService>
            <Footer></Footer>
        </div>
    );
};

export default Home;