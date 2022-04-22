import React, { useEffect, useState, useContext } from "react";
import { GlobalStoreContext } from "../store";
import axios from "axios";
import Tags from "../components/Tags.js";
import PostArea from "../components/PostArea.js";
import { FetchApiGet, FetchApiPost, FetchApiPostWithFile } from "../utils/Network";
import { Button, Typography, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { width } from "@mui/system";

function CreateQuiz(props) {
    //use react hooks to set data (empty array by default)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [likes, setLikes] = useState(0);
    const [imageRef, setImageRef] = useState();
    const [image, setImage] = useState("");
    const [imageURL, setImageURL] = useState("/images/sample.jpeg")
    console.log(props.match.params);
    
    const onClickSubmit = async () => {
        let res = await FetchApiPostWithFile("/api/quizzes/insert", [image],{
            title,
            description,
            platformId: props.match.params.platformId,
            likes,
        });
        alert("quiz added");
    };

    const onClickImage = () => {
        if (imageRef) imageRef.click();
    }

    const onChangeImage = e => {
        setImageURL(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
    }

    return (
        <div className="createquiz-main-container">
            {/* <Tags/> */}
            {/* <PostArea/>*/}
            <Typography fontSize="30px" marginBottom="24px">
                Create Quiz Screen
            </Typography>
            <div className="createquiz-content">
                <div className="createquiz-image-block">
                    <div className="createquiz-content-block-label">IMAGE :</div>
                    <img src={imageURL} onClick={onClickImage}/>
                    <input
                                ref={ref => setImageRef(ref)}
                                id="file-input"
                                type="file"
                                onChange={onChangeImage}
                            />
 
                </div>
                <div className="createquiz-content-block">
                    <div className="createquiz-content-block-label">TITLE :</div>
                    <TextField
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                        label="Title"
                        style={{ minWidth: "300px" }}
                        inputProps={{ style: { fontSize: "14px" } }}
                        InputLabelProps={{ style: { fontSize: "12px" } }}
                    />
                </div>
                <div className="createquiz-content-block">
                    <div className="createquiz-content-block-label">DESCRIPTION :</div>
                    <TextField
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        label="Description"
                        style={{ minWidth: "300px" }}
                        inputProps={{ style: { fontSize: "14px" } }}
                        InputLabelProps={{ style: { fontSize: "12px" } }}
                    />
                </div>
                <Button
                    style={{ width: "10%", marginTop: "12px" }}
                    onClick={onClickSubmit}
                    component={Link}
                    to={`/platform/${props.match.params.platformId}`}
                >
                    SUBMIT
                </Button>
                <Button
                    style={{ width: "10%", marginTop: "12px" }}
                    component={Link}
                    to={`/platform/${props.match.params.platformId}`}
                >
                    CANCEL
                </Button>
            </div>
        </div>
    );
}

export default CreateQuiz;
