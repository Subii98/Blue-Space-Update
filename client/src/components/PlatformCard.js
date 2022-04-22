import React, { useEffect, useState} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

function PlatformCard(props) {
    /*
    return (
        <div className="platformCards">
            <Card sx={props.row ? { width: 100} : {width: 250}} variant="outlined">
                <CardActionArea component={Link} to={`/platform/${props.platform._id}`}>
                    <CardMedia
                        component="img"
                        height={"100"}
                        image={
                            props.platform.banner && props.platform.banner != ""
                                ? props.platform.banner
                                : "/images/sample.jpeg"
                        }
                        alt="category"
                    />
                    {!props.row && <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.platform.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {props.platform.description}
                        </Typography>
                    </CardContent>}
                </CardActionArea>
            </Card>
            <br />
        </div>
    );
    */
    return(
        <div className="platformCards">
            <Card sx={props.row ? { maxWidth: 100} : {maxWidth: 400}} variant="outlined">
                <CardActionArea component={Link} to={`/platform/${props.platform._id}`} sx={!props.row && {display: 'flex', flexDirection: 'row', alignItems:'center', width: '30rem'}}>
                    <CardMedia
                        component="img"
                        sx={props.row ? {width: 100, height: 100} : { width: 100, height: 100, padding: '1.5rem' }}
                        image={
                            props.platform.banner && props.platform.banner != ""
                                ? props.platform.banner
                                : "/images/sample.jpeg"
                        }
                        alt="category"
                    />
                    {!props.row &&
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent:'space-beween', padding: '1rem'}}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', padding:'0'}}>
                            <Typography component="div" variant="h5">
                                {props.platform.title}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" >
                                {props.platform.description}
                            </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '1rem', alignItems:'center'}}>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                {props.platform.userName}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" sx={{display: 'flex', flexDirection:'row', alignItems:'center'}}>
                                <img src="/images/icon/bell1.png" style={{width: '1.3rem', objectFit: 'contain', marginRight: '0.3rem'}}/>{props.platform.subscriber.length}
                            </Typography>
                        </Box>
                    </Box>}
                </CardActionArea>
            </Card>
            <br />
        </div>
    )
}

export default PlatformCard;
