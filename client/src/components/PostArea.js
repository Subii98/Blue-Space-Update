import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../index.css";
import { FetchApiPost } from "../utils/Network";
import axios from "axios";
import { Button, Hidden } from "@mui/material";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

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

    if (platform === undefined) return <div>LOADING..</div>;

    let subscribeButton;
    if (!isOwner) {
        subscribeButton = (
            <button
                style={isSubscribed ? { backgroundColor: "#00aeef", color: "white" } : {}}
                onClick={isSubscribed ? unsubscribe : subscribe}
            >
                {isSubscribed ? "UNSUBSCRIBE" : "SUBSCRIBE"}
            </button>
        );
    }
    else {
        subscribeButton = (<button disabled={true} style={{color: "#d2d2d2", borderColor: "#d2d2d2"}}>SUBSCRIBE</button>);
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
                <div className="platformSettings">
                        <span></span>

                        <button
                            style={isOwner ? {} : { display: "none" }}
                            type="button"
                            onClick={onClickEdit}
                        >
                            <SettingsOutlinedIcon sx={{ fontSize: 20 }}/>
                        </button>
                </div>
                <img src={platform.icon} alt="platformprofile" style={{marginBottom: "20px"}}/>
                <div className="platformInfo">
                    <div className="platformTop">
                        <a href="" Style={"color:" + platform.fontColor}>
                            {platform.title}
                        </a>
                        <span>{platform.userName}</span>
                    </div>
                    <div className="platformLine" />
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
                </div>
            </div>
        </div>
    );
}

export default PostArea;
