import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, CardActionArea, Button } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import Box from '@mui/material/Box';

function QuizCard(props) {
    const history = useHistory();
    const [isOwner, setIsOwner] = useState(false);
    const [platform, setPlatform] = useState();
    const [user, setUser] = useState();
    const [error, setError] = useState(false);

    useEffect(() => {
        if (user && platform) {
            if (user._id == platform.userId) {
                setIsOwner(true);
            }
        }
        // console.log("are you quiz?", isOwner);
    });

    useEffect(() => {
        if (props.quiz.platformId) {
            fetchPlatform();
        }
        if(localStorage.getItem("data")){
            fetchUser()
        }
    }, [props.quiz]);


    function fetchUser() {
        let userData = localStorage.getItem("data");
        userData = JSON.parse(userData);
        axios
            .get("/api/v1/get_user?user_id=" + userData.id)
            .then(res => setUser(res.data))
            .catch(error => {
                setError("No userdata");
            });
    }

    function fetchPlatform() {
        axios
            .get("/api/platforms/by_id/" + props.quiz.platformId)
            .then(res => {
                setPlatform(res.data);
                return;
            })
            .catch(error => {
                console.log(error);
            });
    }
    /*
    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea component={Link} to={`/quiz/${props.quiz._id}`}>
                    <CardMedia
                        component="img"
                        height="140"
                        // image={"/images/sample.jpeg"}
                        image = {props.quiz.quizImage}
                        alt="quizPreview"
                    />
                    <CardContent>
                        <div className="cardContentHeader">
                            <Typography gutterBottom variant="h5" component="div">
                                {props.quiz.title}
                            </Typography>
                            <Typography
                                className="quizHeart"
                                variant="subtitle1"
                                color="text.secondary"
                            >
                                <img src="/images/icon/like2.png" style={{ width: "1rem" }} />
                                {props.quiz.likes}
                            </Typography>
                        </div>
                        <Typography variant="body2" color="text.secondary">
                            {props.quiz.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <Button
                    style={isOwner ? {} : { display: "none" }}
                    onClick={() => history.push("/CreateQuestion/" + props.quiz._id)}
                >
                    Create/Edit Question
                </Button>
            </Card>
            <br />
        </div>
    );
    */

    return (
        <div>
            <Card sx={props.row ? { maxWidth: 100 } : { maxWidth: 400 }} variant="outlined">
                <CardActionArea
                    component={Link}
                    to={`/quiz/${props.quiz._id}`}
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "30rem",
                    }}
                >
                    <CardMedia
                        component="img"
                        sx={{ width: 100, height: 100, padding: '1.5rem' }}
                        image = {props.quiz.quizImage}
                        alt="thumbnail"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent:'space-beween', padding: '1rem'}}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', padding:'0'}}>
                            <Typography component="div" variant="h5">
                                {props.quiz.title}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" >
                                {props.quiz.description}
                            </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '1rem', alignItems:'center'}}>
                            <Typography
                                    className="quizHeart"
                                    variant="subtitle1"
                                    color="text.secondary"
                                    sx={{display: 'flex', flexDirection:'row', alignItems:'center'}}
                                >
                                    <img src="/images/icon/like.png" style={{ width: '1.3rem', objectFit: 'contain', marginRight: '0.3rem'}} />
                                    {props.quiz.likes}
                            </Typography>
                        </Box>
                    </Box>
                </CardActionArea>
                <Button
                        style={isOwner ? {} : { display: "none" }}
                        onClick={() => history.push("/CreateQuestion/" + props.quiz._id)}
                    >
                        Create/Edit Question
                </Button>
            </Card>
            <br />
        </div>
    );
}

export default QuizCard;
