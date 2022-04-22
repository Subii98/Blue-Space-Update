import React from 'react'
import CategoryCard from './CategoryCard.js'



function Categories() {
    const categoryNames = ["Entertainment"]
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
    const lizardInfo = {name:"Lizzard", description: "Lizards from all sizes are included. Lizards are one the most amazing creatures on earth",image: "./images/lizard.jpg",route: "/search", search: 'lizzard'};
    const bluespace = {name: "BlueSPace", description :"Quiz on blue space the website", 
    image: "./images/logo11.png",route: "/search", search: 'bluespace'};
    const filler = {name: "Filler", description :"Will search for test", image: "./images/logo11.png",route: "/search", search: "test"};
    const catinfo = [bluespace,lizardInfo,filler]
    /*
    return (
      <div className="categories">
        <h1>Categories</h1>
        <div className={['flex-container', 'wrap'].join(" ")}>
          {catinfo.map((elem) => (
            <div className='flex-item'>
              <CategoryCard category={elem} />
            </div>
          ))}
        </div>
      </div>
      
    );
    */
   return(
     <div className="categories">
        <h1>Categories</h1>
        <div className="subCategories">
          <h2>Entertainment</h2>
          <div className="categoryItems">
              {entertainment.map( (category) => (
                <div className="flex-item">
                  <CategoryCard category={category}/>
                </div>
              ))}
          </div>
        </div>
        <div className="subCategories">
          <h2>Educational</h2>
          <div className="categoryItems">
              {educational.map( (category) => (
                <div className="flex-item">
                  <CategoryCard category={category}/>
                </div>
              ))}
          </div>
        </div>
        <div className="subCategories">
          <h2>Sports</h2>
          <div className="categoryItems">
              {sports.map( (category) => (
                <div className="flex-item">
                  <CategoryCard category={category}/>
                </div>
              ))}
          </div>
        </div>
     </div>
   )

}

export default Categories
