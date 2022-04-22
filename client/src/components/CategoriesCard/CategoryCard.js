import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import { GlobalStoreContext } from "../../store";
import { useContext, useEffect, useState } from "react";

function CategoryCard(props) {
  const { store } = useContext(GlobalStoreContext);
    /*
<Typography variant="subtitle1" color="text.secondary" component="div">
            {props.user}
          </Typography>
    */
    return (
      <Card sx={{ maxWidth: 300}}>
        <CardActionArea onClick={()=> {store.setSearch(props.category.search)}}component={Link} to={props.category.route}>
          <CardMedia
            component="img"
            height="190"
            image={props.category.image}
            alt="category"
          />
          <CardContent className="cardContent">
            <img className="categoryIcon" src={props.category.icon} alt="icon"/>
            <Typography variant="h5" component="div" style={{fontSize: "2rem", fontFamily: "oswald-light"}}>
              {props.category.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
}

export default CategoryCard
