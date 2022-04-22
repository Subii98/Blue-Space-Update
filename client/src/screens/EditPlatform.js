import React, { useEffect, useState, useContext } from "react";
import { GlobalStoreContext } from "../store";
import axios from "axios";
import Tags from "../components/Tags.js";
import PostArea from "../components/PostArea.js";
import LoadingModal from "../components/LoadingModal.js";
import MessageModal from "../components/MessageModal.js";
import { FetchApiDelete, FetchApiPost, FetchApiPostWithFile } from "../utils/Network";
import { useHistory, Link } from "react-router-dom";
import { Button } from "@mui/material";
import { ConstructionOutlined } from "@mui/icons-material";

function EditPlatform(props) {
    const history = useHistory();
    const { store } = useContext(GlobalStoreContext);
    //use react hooks to set data (empty array by default)
    const [platform, setPlatform] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [createPlatform, setCreatePlatform] = useState(null);

    // const [id, setId] = useState("0");
    // const [userId, setUserId] = useState("0");
    const [userName, setUserName] = useState(store.username);
    // const [name, setName] = useState(store.username);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [banner, setBanner] = useState("");
    const [bannerURL, setBannerURL] = useState("");
    const [bannerImageRef, setBannerImageRef] = useState();

    const [subscriber, setSubscriber] = useState("");
    const [icon, setIcon] = useState("");
    const [iconURL, setIconURL] = useState("");
    const [iconImageRef, setIconImageRef] = useState();

    // const [fontFamily, setFontFamily] = useState("");
    // const [titleFontSize, setTitleFontSize] = useState(0);
    // const [descFontSize, setDescFontSize] = useState(0);
    const [fontColor, setFontColor] = useState("");
    const [tag1, setTag1] = useState("");
    const [tag2, setTag2] = useState("");
    const [tag3, setTag3] = useState("");
    // const [quizId, setQuizId] = useState("");

    const onClickBanner = () => {
        if (bannerImageRef) bannerImageRef.click();
    };

    const onClickIcon = () => {
        if (iconImageRef) iconImageRef.click();
    };

    const onChangeBanner = e => {
        setBannerURL(URL.createObjectURL(e.target.files[0]));
        setBanner(e.target.files[0]);
    };

    const onChangeIcon = e => {
        setIconURL(URL.createObjectURL(e.target.files[0]));
        setIcon(e.target.files[0]);
    };

    useEffect(() => {
        if (platform) {
            setTitle(platform.title);
            setDescription(platform.description);
            setFontColor(platform.fontColor);
            setTag1(platform.tag1);
            setTag2(platform.tag2);
            setTag3(platform.tag3);
            setBannerURL(platform.banner);
            setIconURL(platform.icon);
        }
    }, [platform]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(
                    "/api/platforms/by_id/" + props.match.params.platformId
                );
                console.log(data);
                setLoading(false);
                setPlatform(data);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, [props.match.params.platformId]);

    useEffect(() => {
        setUserName(store.username);
    }, [store]);

    const onClickSubmit = async () => {
        let res = await FetchApiPostWithFile("/api/platforms/edit", [banner, icon], {
            platformId: platform._id,
            userName: userName,
            title: title,
            description: description,
            fontColor: fontColor,
            tag1: tag1,
            tag2: tag2,
            tag3: tag3,
            banner: platform.banner ,
            banner_changed : banner != "" ? 1 : 0,
            icon: platform.icon ,
            icon_changed : icon != "" ? 1 : 0
        });
        alert("platform edit");
        history.goBack();
    };

    const onClickDelete = async e => {
        let res = await FetchApiDelete("/api/platforms/platformDelete", {
            platformId: platform._id,
        });
        console.log(res);
        alert("platform delete");
        // history.goBack();
    };

    return (
        <div>
            <div>
                {loading && <LoadingModal />}
                {error && <MessageModal variant="danger">{error}</MessageModal>}
                <div className="create-plaform-main">
                    <div>
                        {loading && <LoadingModal />}
                        {error && <MessageModal variant="danger">{error}</MessageModal>}
                        <div className="tags">
                            <input
                                className="tag-input"
                                value={tag1}
                                onChange={e => setTag1(e.target.value)}
                                placeholder="#Tag1"
                            />
                            <input
                                className="tag-input"
                                value={tag2}
                                onChange={e => setTag2(e.target.value)}
                                placeholder="#Tag2"
                            />
                            <input
                                className="tag-input"
                                value={tag3}
                                onChange={e => setTag3(e.target.value)}
                                placeholder="#Tag2"
                            />
                        </div>
                        <div className="postArea">
                            <input
                                ref={ref => setBannerImageRef(ref)}
                                id="file-input"
                                className="cp-banner-input"
                                type="file"
                                onChange={onChangeBanner}
                            />
                            <div
                                className="cp-banner"
                                style={{
                                    backgroundImage: `url(${
                                        bannerURL && bannerURL != ""
                                            ? bannerURL
                                            : "./images/sample.jpeg"
                                    })`,
                                }}
                                onClick={onClickBanner}
                            />
                            <div className="platformInfoArea">
                                <div>
                                    <img src={iconURL} onClick={onClickIcon} />
                                    <input
                                        ref={ref => setIconImageRef(ref)}
                                        id="file-input"
                                        className="cp-banner-input"
                                        type="file"
                                        onChange={onChangeIcon}
                                    />
                                </div>
                                <div className="platformInfo">
                                    <div className="platformTop">
                                        <input
                                            value={title}
                                            onChange={e => setTitle(e.target.value)}
                                            placeholder="Title"
                                            style={{ fontSize: "40px", width: "70%" }}
                                        />
                                        {/* <span>title font color</span> */}
                                        <input
                                            type="color"
                                            value={fontColor}
                                            onChange={e => setFontColor(e.target.value)}
                                        />

                                        <span>{store.username}</span>
                                    </div>
                                    <div className="platformBottom">
                                        {/* <span>{platform.description}</span> */}
                                        <input
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                            placeholder="description"
                                            style={{ fontSize: "12px", width: "70%" }}
                                        />
                                        <Button
                                            style={{
                                                backgroundColor: "#00aeef",
                                                color: "white",
                                                float: "right",
                                            }}
                                        >
                                            {"SUBSCRIBE"}
                                        </Button>
                                    </div>
                                    <div className="platformBottom">
                                        <span></span>
                                        <button type="button">EDIT</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Button
                                className="asd"
                                onClick={onClickSubmit}
                                style={{
                                    backgroundColor: "#00aeef",
                                    color: "white",
                                    float: "right",
                                }}
                            >
                                {"SAVE"}
                            </Button>
                            <Button
                                onClick={() => history.goBack()}
                                style={{
                                    float: "right",
                                    color: "#00aeef",
                                    bordercolor: "#00aeef",
                                    borderradius: "5px",
                                    borderstyle: "solid",
                                    borderwidth: "1px",
                                }}
                            >
                                {"CANCEL"}
                            </Button>
                            <Button
                            component={Link} to ="/"
                                onClick={onClickDelete}
                                style={{
                                    float: "right",
                                    color: "#00aeef",
                                    bordercolor: "#00aeef",
                                    borderradius: "5px",
                                    borderstyle: "solid",
                                    borderwidth: "1px",
                                }}
                            >
                                {"DELETE"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditPlatform;
