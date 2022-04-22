import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../index.css";
import { FetchApiPost } from "../utils/Network";
import axios from "axios";
import { Button, Hidden } from "@mui/material";

function PostArea(props) {
    const history = useHistory();
    const [platform, setPlatform] = useState();
    const [user, setUser] = useState();
    const [error, setError] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isOwner, setIsOwner] = useState(false);

    const subscribe = async () => {
        let res = await FetchApiPost("/api/v1/subscribe", {
            userId: user._id,
            platformId: platform._id,
        });
        if (res) {
            setIsSubscribed(true);
        }
    };

    const unsubscribe = async () => {
        let res = await FetchApiPost("/api/v1/unsubscribe", {
            userId: user._id,
            platformId: platform._id,
        });
        if (res) {
            setIsSubscribed(false);
        }
    };

    useEffect(() => {
        if (props.platform) {
            setPlatform(props.platform);
        }
        fetchUser();
    }, [props.platform]);

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

    useEffect(() => {
        if (user) {
            let _isSubscribed = user.subscribedPlatforms.indexOf(platform._id) != -1;
            setIsSubscribed(_isSubscribed);
            if (user._id == platform.userId) {
                setIsOwner(true);
            }
        }
    }, [user]);

    const onClickEdit = () => {
        history.push("/EditPlatform/" + platform._id);
    };

    if (platform == undefined) return <div>LOADING..</div>;
    console.log(platform);
    console.log(user);

    let subscribeButton;
    if (!isOwner) {
        subscribeButton = (
            <Button
                style={isSubscribed ? { backgroundColor: "#00aeef", color: "white" } : {}}
                onClick={isSubscribed ? unsubscribe : subscribe}
            >
                {isSubscribed ? "UNSUBSCRIBE" : "SUBSCRIBE"}
            </Button>
        );
    }

    return (
        <div className="postArea">
            <div className="banner">
                <img
                    src={
                        platform.banner && platform.banner != ""
                            ? platform.banner
                            : "./images/sample.jpeg"
                    }
                />
            </div>
            <div className="platformInfoArea">
                <img src={platform.icon} alt="platformprofile" />
                <div className="platformInfo">
                    <div className="platformTop">
                        <a href="" Style={"color:" + platform.fontColor}>
                            {platform.title}
                        </a>
                        <span>{platform.userName}</span>
                    </div>
                    <div className="platformBottom">
                        <span>{platform.description}</span>
                        {subscribeButton}
                        {/* <Button
                            style={
                                isSubscribed ? { backgroundColor: "#00aeef", color: "white" } : {}
                            }
                            onClick={isSubscribed ? unsubscribe : subscribe}
                        >
                            {isSubscribed ? "UNSUBSCRIBE" : "SUBSCRIBE"}
                        </Button> */}
                    </div>
                    <div className="platformBottom">
                        <span></span>

                        <button
                            style={isOwner ? {} : { display: "none" }}
                            type="button"
                            onClick={onClickEdit}
                        >
                            EDIT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostArea;
