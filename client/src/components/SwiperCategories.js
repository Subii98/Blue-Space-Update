import React from 'react'
import {Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Navigation, Pagination} from 'swiper';
import CategoryCard from "./CategoriesCard/CategoryCard.js";
//import '/swiper/swiper-bundle.css';

// swiper bundle styles
import 'swiper/swiper-bundle.min.css'

// swiper core styles
import 'swiper/swiper.min.css'

// modules styles
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'

import HomePageCategoryCard from './HomePageCategoryCard.js'

SwiperCore.use([Navigation, Pagination]);

function SwiperCategories() {
    const slides = [];
    /* const lizardInfo = {name:"Lizzard", description: "Lizards from all sizes are included. Lizards are one the most amazing creatures on earth",image: "./images/lizard.jpg",route: "/search", search: 'lizzard'};
    const bluespace = {name: "BlueSPace", description :"Quiz on blue space the website", 
    image: "./images/logo11.png",route: "/search", search: 'bluespace'};
    const filler = {name: "Filler", description :"Will search for test", image: "./images/logo11.png",route: "/search", search: "test"};
    const sea = {name: "Deep Sea", description :"Deep Fish of the Sea", image: "./images/deepfish.jpg",route: "/search", search: "fish"};
    const tiger = {name: "Tigers", description :"All about tigers", image: "./images/tiger.jpg",route: "/search", search: "tiger"};
    const icecream = {name: "Ice Cream", description :"Ice Cream", image: "./images/icecream.jpg",route: "/search", search: "cream"};
    const catinfo = [bluespace,lizardInfo,filler, sea,tiger,icecream ] */
    const entertainment = [
      {name: "Music", image: "/images/category/category_music.jpg", icon: "/images/category/icon/music.png", route: "/search", search: "music"},
      {name: "Movie", image: "/images/category/category_movie.jpg", icon: "/images/category/icon/pop-corn.png", route: "/search", search: "movie"},
      {name: "Game", image: "/images/category/category_game.jpg", icon: "/images/category/icon/console.png", route: "/search", search: "game"}
    ]
    const educational = [
      {name: "History", image: "/images/category/category_history.jpg", icon: "/images/category/icon/book.png", route: "/search", search: "history"},
      {name: "Science", image: "/images/category/category_science.jpg", icon: "/images/category/icon/science.png", route: "/search", search: "science"},
      {name: "Literature", image: "/images/category/category_literature.jpg", icon: "/images/category/icon/literature.png", route: "/search", search: "literature"}
    ]
    const sports = [
      {name: "Soccer", image: "/images/category/category_soccer.jpg", icon: "/images/category/icon/football.png", route: "/search", search: "soccer"},
      {name: "Olympics", image: "/images/category/category_olympics.jpg", icon: "/images/category/icon/olympic-games.png", route: "/search", search: "olympics"},
      {name: "Baseball", image: "/images/category/category_baseball.jpg", icon: "/images/category/icon/baseball-ball.png", route: "/search", search: "baseball"}
    ]
    var catinfo = entertainment.concat(educational, sports)
    
    for (let i = 0; i < 8; i +=1){
        slides.push(
            <SwiperSlide key={`slide-${i}`}>
                <CategoryCard category={catinfo[i]} />
            </SwiperSlide>
        );
    }
    return (
        <div>
            {/* <Swiper
                id="main"
                tag="section"
                wrapperTag="ul"
                navigation
                pagination={{ clickable: true }}
                spaceBetween={0}
                slidesPerView={1}
                centeredSlides="true"
            > */}
            <Swiper
                grabCursor="true"
                centeredSlides="true"
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true, dynamicBullets: true }}
            >
                {slides}
            </Swiper>
        </div>
    );
}

export default SwiperCategories
