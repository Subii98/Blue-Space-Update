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
            <p style={{fontSize: "2rem", textAlign: "center"}}>Create Quiz</p>
            <div className="createquiz-content">
                <div className="createquiz-thumbnail">
                    <p>Thumbnail</p>
                    <div className="createquiz-image-block">
                        <img src={imageURL} onClick={onClickImage}/>
                        <input ref={ref => setImageRef(ref)} id="file-input" type="file" onChange={onChangeImage} />
                    </div>
                </div>
                <div className="createquiz-details">
                    <p>Title</p>
                    <div className="createquiz-content-block">
                        <TextField
                            hiddenLabel
                            onChange={e => setTitle(e.target.value)}
                            value={title}
                            style={{ minWidth: "300px" }}
                            inputProps={{ style: { fontSize: "14px" } }}
                            InputLabelProps={{ style: { fontSize: "12px" } }}
                        />
                    </div>
                    <p>Description</p>
                    <div className="createquiz-content-block">
                        <TextField
                            hiddenLabel
                            onChange={e => setDescription(e.target.value)}
                            value={description}
                            style={{ minWidth: "300px" }}
                            inputProps={{ style: { fontSize: "14px" } }}
                            InputLabelProps={{ style: { fontSize: "12px" } }}
                        />
                    </div>
                </div>
            </div>
            <div className="createquiz-buttons">
                <button
                    style={{ width: "10%", marginTop: "12px", color: "white", backgroundColor: "#00aeef"}}
                    onClick={onClickSubmit}
                    component={Link}
                    to={`/platform/${props.match.params.platformId}`}
                >
                    SAVE
                </button>
                <button
                    style={{ width: "10%", marginTop: "12px", color: "#929292", backgroundColor: "transparent"}}
                    component={Link}
                    to={`/platform/${props.match.params.platformId}`}
                >
                    CANCEL
                </button>
            </div>
        </div>
    );
}

export default CreateQuiz;
