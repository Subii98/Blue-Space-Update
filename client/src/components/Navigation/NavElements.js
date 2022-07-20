import React from 'react'
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HistoryIcon from "@mui/icons-material/History";
import CopyrightIcon from "@mui/icons-material/Copyright";
import FolderSharedOutlinedIcon from "@mui/icons-material/FolderSharedOutlined";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import { FetchApiPost } from "../../utils/Network";
import axios from "axios";
import {useState, useEffect} from 'react'
import Modal from "../SendFeedback/Modal.js";
import { Link, useHistory } from "react-router-dom";

function NavElements() {
    const [data, setData] = useState();
    const [user, setUser] = useState();
    const [subscribedID, setSubscribedID] = useState([]);
    const [subscribedNames, setSubscribedNames] = useState([]);
    const [error, setError] = useState();
    const [top3, setTop3] = useState();
    function fetchUser() {
        let userData = localStorage.getItem("data");
        userData = JSON.parse(userData);
        axios
            .get("/api/v1/get_subscribers/" + userData.id)
            .then(res => setData(res.data))
            .catch(error => {
                setError("No userdata");
            });
        axios
            .get("/api/v1/get_top3")
            .then(res => setTop3(res.data))
            .catch(error => {
                setError("No Top3");
            });
    }
    function getQuizzes() {
        let userData = localStorage.getItem("data");
        userData = JSON.parse(userData);
        axios
            .get("/api/recentquiz/"+userData.id)
            .then(res => setQuizzes(res.data))
            .catch(error => {
                setError("No quizdata");
            });
    }


    useEffect(()=> {
        fetchUser();
        getQuizzes();
    }, []);

    useEffect(()=> {
        setSubscribedID(data?.ids);
        setSubscribedNames(data?.names);
        console.log("data is set now", data);
    }, [data]);

    /* useEffect(() => {
        if (user) {
            console.log("!!!!", user.subscribedPlatforms);
            console.log("!!!!", platform._id);
            let _isSubscribed = user.subscribedPlatforms.indexOf(platform._id) != -1;
            setIsSubscribed(_isSubscribed);
        }
    }, [user]); */
    const [showModal, setShowModal] = useState(false);
    const [modalFeedback, setModalFeedback] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [quizzes, setQuizzes] = useState();
    function modalOpen() {
        setShowModal(true);

    }

    const handleChange = (e) =>{
        const target = e.target;
        const name = target.name;
        const value = target.value;

        setModalFeedback(value);
    }
    const handleEmailChange = e => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        setEmail(value);
        console.log("modal changed email", email);
    };

        

    const modalClose = (e) =>{
        setShowModal(false);
        setModalFeedback("");
        setEmail("");
    }

    const feedbackSubmit = async (e) =>{
        console.log("modal submitted");
        let res = await FetchApiPost("/api/feedback/savefeedback", {
            email: email,
            feedback: modalFeedback,
        });
        modalClose();
    }
    
    return (
        <div className="navContainer">
            <div className="nav-title" style={{marginBottom: "1rem"}}>
                <HomeOutlinedIcon
                    style={{ color: "black", marginRight: "2px" }}
                    sx={{ fontSize: 25 }}
                ></HomeOutlinedIcon>
                <a className="popup nButton" href="/">
                    Home
                </a>
            </div>
            <div className="nav-element">
                <div className='nav-title'>
                    <HistoryIcon style={{ color: "black", marginRight: "2px" }} sx={{ fontSize: 25 }}></HistoryIcon>
                    Recent Quizzes
                </div>
                <div className="linksContainer">
                    {quizzes
                        ? quizzes.map((quiz, index) => {
                              /* console.log("entered loop: ", sub, index); */
                              const quizName = quiz.quizName;
                              const quizIds = quiz._id;
                              return (
                                  <ui className="navLinks">
                                      <a href={`/quiz/${quizIds}`}>{index+1}. {quizName}</a>
                                  </ui>
                              );
                          })
                        : null}
                </div>
            </div>
            <div className="nav-element">
                <div className='nav-title'>
                    <FolderSharedOutlinedIcon style={{ color: "black", marginRight: "2px" }} sx={{ fontSize: 25 }}>
                        {" "}
                    </FolderSharedOutlinedIcon>
                    Subscribed Platforms
                </div>
                <div className="linksContainer">
                    {subscribedID
                        ? subscribedID.map((sub, index) => {
                              /* console.log("entered loop: ", sub, index); */
                              const subName = subscribedNames[index];
                              return (
                                  <ui className="navLinks">
                                      <a href={`/platform/${sub}`}>{index+1}. {subName}</a>
                                  </ui>
                              );
                          })
                        : null}
                </div>
            </div>
            <div className="nav-element">
                <div className='nav-title'>
                    <FolderSharedOutlinedIcon style={{ color: "black", marginRight: "2px" }} sx={{ fontSize: 25 }}>
                        {" "}
                    </FolderSharedOutlinedIcon>
                    Suggested Platforms
                </div>
                <div className="linksContainer">
                    {top3
                        ? top3.map((plat, index) => {
                              /* console.log("entered loop: ", sub, index); */
                              const subName = plat.title
                              return (
                                  <ui className="navLinks">
                                      <a href={`/platform/${plat._id}`}>{index+1}. {subName}</a>
                                  </ui>
                              );
                          })
                        : null}
                </div>
            </div>
            <div className="nav-title" style={{marginBottom: "1rem"}}>
                <AnnouncementOutlinedIcon style={{ color: "black", marginRight: "2px" }} sx={{ fontSize: 25 }}>
                    {" "}
                </AnnouncementOutlinedIcon>
                <a className="popup" href="https://twitter.com" target="_blank">
                    Announcements on Twitter
                </a>
            </div>
            <div className="nav-element" style={{marginBottom: "1rem"}}>
                <a className="popup" href="javascript:;" onClick={e => modalOpen(e)}>
                    <TextsmsOutlinedIcon style={{ color: "black", marginRight: "2px" }} sx={{ fontSize: 25 }}>
                        {" "}
                    </TextsmsOutlinedIcon>
                    Send Us Feedback
                </a>
            </div>

            <div className="nav-copyright">
                <CopyrightIcon style={{ color: "#929292", marginRight: "2px"}} sx={{ fontSize: 20 }}></CopyrightIcon>
                Blue-Space 2021
            </div>
            <div className={`send-feedback ${showModal ? "expanded" : ""}`}>
                {showModal ? (
                    <div>
                        <Modal>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="text"
                                    className="popup"
                                    name="email"
                                    placeholder="Email-Address"
                                    value={email}
                                    onChange={e => handleEmailChange(e)}
                                />

                                <label>Send us Feedback</label>
                                <input
                                    type="textarea"
                                    value={modalFeedback}
                                    name="modalFeedback"
                                    onChange={e => handleChange(e)}
                                    placeholder="Send us any feedback"
                                    className="popup"
                                />
                            </div>
                            <div className="form-group">
                                <button
                                    className="popupButton"
                                    onClick={e => feedbackSubmit(e)}
                                    type="button"
                                    style={{backgroundColor: "#00aeef", color: "white"}}
                                >
                                    SEND
                                </button>
                                <button
                                    className="popupButton"
                                    onClick={e => modalClose(e)}
                                    type="button"
                                    style={{backgroundColor: "transparent", color: "#929292"}}
                                >
                                    CANCEL
                                </button>
                                
                            </div>
                        </Modal>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default NavElements
