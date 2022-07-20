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
        <div className="swipercategories">
            <p style={{fontSize: "2.5rem", textAlign: "center", padding: "0"}}>Categories</p>
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
            <Swiper style={{ width: "50rem", height: "35rem"}}
                grabCursor="true"
                centeredSlides="true"
                spaceBetween={30}
                slidesPerView={2}
                lazy
                navigation
                pagination={{ clickable: true, dynamicBullets: false }}
                loop={true}
            >
                {slides}
            </Swiper>
        </div>
    );
}

export default SwiperCategories
