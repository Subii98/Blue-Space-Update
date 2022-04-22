import React, { useEffect, useState, useContext } from "react";
import { GlobalStoreContext } from "../store";
import axios from "axios";
import Tags from "../components/Tags.js";
import PostArea from "../components/PostArea.js";
import LoadingModal from "../components/LoadingModal.js";
import MessageModal from "../components/MessageModal.js";
import { FetchApiGet } from "../utils/Network";
import Platform from "../components/Platform.js";
import PlatformCard from "../components/PlatformCard.js";
import { Link, useHistory } from "react-router-dom";
import PaginatedItems from "../components/PaginatedItems";
import PlatformItems from "../components/PlatformItems";
import ReactPaginate from "react-paginate";

function MyPage(props) {
    const { store } = useContext(GlobalStoreContext);
    //use react hooks to set data (empty array by default)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [name, setName] = useState("");
    const [platforms, setPlatforms] = useState([]);
    const [user, setUser] = useState();
    const [title, settitle] = useState("");
    const [exp, setExp] = useState();
    const [points, setPoints] = useState();
    const [totalQuestions, setTotalQuestions] = useState("");
    const [correct, setCorrect] = useState("");
    const [badge, setBadge] = useState("");
    const [level, setLevel] = useState()
    const [expBarAmount, setExpBarAmount] = useState()
    const [subscribingPlatforms, setSubscribingPlatforms] = useState([]);
    const expRange = [15, 49, 106, 198, 333, 705, 9999]
    const [userImage, setUserImage] = useState("");
    const [playCount, setUserPlayCount] = useState()
    const history = useHistory();

    //pagination stuff
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(4)
    const [itemOffset, setItemOffset] = useState(0);

    const [currentItems2, setCurrentItems2] = useState(null);
    const [pageCount2, setPageCount2] = useState(0);
    const [itemOffset2, setItemOffset2] = useState(0);

    useEffect(() => {
        let userData = localStorage.getItem("data");
        userData = JSON.parse(userData);
        axios
            .get("/api/v1/get_user?user_id=" + userData.id)
            .then(res => setUser(res.data))
            .catch(error => {
                setError("No userdata");
            });
    }, [history.location.pathname]);

    useEffect(() => {
        if (user) {
            if (user) {
                setName(user.username)
                settitle(user.title);
                setExp(user.exp);
                setPoints(user.points);
                setTotalQuestions(user.totalQuestions);
                setCorrect(user.correct);
                setBadge(user.badge)
                setLevel(user.level)            
                setExpBarAmount( user.exp / expRange[user.level - 1] * 100)
                setUserImage(user.userImage)
                setUserPlayCount(user.playCount)
            }
            const fetchData = async () => {
                setLoading(true);
                const { data } = await axios.get("/api/platforms/" + user._id);
                setLoading(false);
                setPlatforms(data);
                console.log("dataaaa", user.subscribedPlatforms);
                user.subscribedPlatforms.map((raw, idx) => {
                    subscribe(raw);
                });
                
                console.log("?",subscribingPlatforms);
                console.log("platforms", platforms);
            };
            fetchData();
        }
    }, [user]);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(platforms.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(platforms.length / itemsPerPage));
    }, [platforms]);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(platforms.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(platforms.length / itemsPerPage));
    }, [itemOffset]);

    useEffect(() => {

    }, [currentItems, currentItems2])
    
      // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % platforms.length;
        console.log(
          `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset2 + itemsPerPage;
        console.log(`Loading items from ${itemOffset2} to ${endOffset}`);
        setCurrentItems2(subscribingPlatforms.slice(itemOffset2, endOffset));
        setPageCount2(Math.ceil(subscribingPlatforms.length / itemsPerPage));
    }, [subscribingPlatforms]);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset2 + itemsPerPage;
        console.log(`Loading items from ${itemOffset2} to ${endOffset}`);
        setCurrentItems2(subscribingPlatforms.slice(itemOffset2, endOffset));
        setPageCount2(Math.ceil(subscribingPlatforms.length / itemsPerPage));
    }, [itemOffset2]);
    
      // Invoke when user click to request another page.
    const handlePageClick2 = (event) => {
        const newOffset = (event.selected * itemsPerPage) % subscribingPlatforms.length;
        console.log(
          `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset2(newOffset);
    };

    function subscribe(id) {
        axios
            .get("/api/platforms/by_id/" + id)
            .then(res =>{ 
                subscribingPlatforms.push(res.data);
                console.log("!!",subscribingPlatforms);
                setSubscribingPlatforms([...subscribingPlatforms]);
            })
            .catch(error => {
                setError("No userdata");
            });
    }

    // useEffect(() => {
    //     if (store && store.username) setName(store.username);
    // }, [store]);

    // useEffect(() => {
        
    // }, [platforms, subscribingPlatforms]);

    /*
    return (
        <div>
            <div>
                {loading && <LoadingModal />}
                {error && <MessageModal variant="danger">{error}</MessageModal>}                
                <div className="side">
                    <div className="profile">
                        <div className="settingsGear">
                            <img src="/images/icon/gear.png" style={{opacity: "0%"}}/>
                            <button onClick={() => history.push(`/ProfileSetting/${user._id}`)}><img src="/images/icon/gear.png"/></button>
                        </div>
                        <div className="profile-image">
                            <img src={userImage} />
                        </div>
                        <div className="userPreview">
                            <div className="userTitle">
                                <p style={{ textAlign: "center"}}>{title}</p>
                            </div>
                            <div className="usernameBadge">
                                <img src={badge}/>
                                <span>{name}</span>
                            </div>
                        </div>
                        <div className="expBarWithLevel2">
                            <p>Lv.{level}</p>
                            <div className="expBarContainer2">
                            <div className="expBar2 rate" style={{width: `${expBarAmount}%`}}></div>
                        </div>
                    </div>
                    </div>
                    <div className="platforms-list">
                        <div className="stat">STATS</div>
                        <div className="stat-value">
                            <div className="child">ACCURACY</div>
                            <div className="child">TITLE</div>
                            <div className="child">RANK</div>
                            <div className="child">POINTS</div>
                        </div>
                        <div className="stat-value">
                            <div className="child">
                                {totalQuestions != 0 ? (correct / totalQuestions) * 100 : 0}%
                            </div>
                            <div className="child">{title}</div>
                            <div className="child">{exp}</div>
                            <div className="child">{points}</div>
                        </div>

                        <div className="platform-box">
                            <p>Owned Platforms</p>
                            <Platform platforms={platforms} row={true}></Platform>
                        </div>
                        <div className="platform-box">
                            <p>Subscribed Platforms</p>
                            <Platform platforms={subscribingPlatforms} row={true}></Platform>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    */
    return(
        <div>
            {loading && <LoadingModal />}
            {/* {error && <MessageModal variant="danger">{error}</MessageModal>} */}
            <div className="myPage">
                <div className="sideArea">
                    <div className="settingsGear">
                        <button onClick={() => history.push(`/ProfileSetting/${user._id}`)}><img src="/images/icon/gear.png"/></button>
                    </div>
                    <div className="sideAreaInfo">
                        <div className="profileImage">
                            <img src={userImage} alt="profile"/>
                        </div>
                        <div className="userPreview">
                            <div className="userTitle">
                                <p style={{ textAlign: "center"}}>{title}</p>
                            </div>
                            <div className="usernameBadgeMyPage">
                                <img src={badge}/>
                                <span>{name}</span>
                            </div>
                        </div>
                        <div className="expBarWithLevel2">
                            <p>Lv.{level}</p>
                            <div className="expBarContainer2">
                                <div className="expBar2" style={{width: `${expBarAmount}%`}}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="myPageDetails">
                    <div className="myPageDetailsList">
                        <div className="myPageDetailsListTitle">
                            <p>STATS</p>
                            <div className="lineStats"/>
                        </div>
                        <div className="myPageStats">
                            <div className="myPageStatsInfo">
                                <p>ACCURACY</p>
                                <h1>{Math.round(totalQuestions != 0 ? (correct / totalQuestions) * 100 : 0)}%</h1>
                            </div>
                            <div className="myPageStatsInfo">
                                <p>PLAY COUNT</p>
                                <h1>{playCount}</h1>
                            </div>
                            <div className="myPageStatsInfo">
                                <p>TITLE</p>
                                <h1>{title}</h1>
                            </div>
                            <div className="myPageStatsInfo">
                                <p>POINTS</p>
                                <h1>{points}p</h1>
                            </div>
                        </div>
                    </div>
                    <div className="myPageDetailsList2">
                        <div className="myPagePlatformsHeader">
                            <p>OWNED PLATFORMS</p>
                            <div className="linePlatforms"/>
                        </div>                        
                        {currentItems && <PlatformItems currentItems={currentItems} row={true}/>}
                        <ReactPaginate
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="<"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                        />
                    </div>
                    <div className="myPageDetailsList2">
                        <div className="myPagePlatformsHeader">
                            <p>SUBSCRIBED PLATFORMS</p>
                            <div className="linePlatforms"/>
                        </div>
                        {currentItems2 && <PlatformItems currentItems={currentItems2} row={true}/>}
                        <ReactPaginate
                        nextLabel=">"
                        onPageChange={handlePageClick2}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount2}
                        previousLabel="<"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                        />
                    </div>
                </div>
            </div>
        </div>
          
    )
}

export default MyPage;
