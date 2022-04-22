import axios from "axios";
import React, { useState, useEffect } from "react";
import { FetchApiPost } from "../utils/Network";
import PaginatedItems from '../components/PaginatedItems.js';
import ReactPaginate from "react-paginate";

function StoreScreen(){
    const badges = ["/images/badges/car.png", "/images/badges/sword.png", "/images/badges/abduction.png", "/images/badges/dog.png", "/images/badges/worldwide.png",
        "/images/badges/crown.png", "/images/badges/cookie.png", "/images/badges/cat.png", "/images/badges/apple.png", "/images/badges/merry-go-round.png"]
    const badgeNames = ["car", "sword", "ufo", "doggo", "earth",
        'crown', 'cookie', 'cat', 'apple', 'ride']
    const badgeCost = 100
    const titleCost = 100
    const [currentBadge, setCurrentBadge] = useState("")
    const [currentTitle, setCurrentTitle] = useState("")

    const titles = ["Mastermind", "Invincible", "Immortal Hero", "Specialist", "Expert", "Apprentice", "Superior", "Human Enough", "Champion", "Midas's Touch", "Clairvoyant", "Unstoppable"]
    const [user, setUser] = useState()
    const [error, setError] = useState(false);
    const [userPoints, setUserPoints] = useState()
    const [username, setUsername] = useState()

    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [itemOffset, setItemOffset] = useState(0);

    const [currentItems2, setCurrentItems2] = useState(null);
    const [pageCount2, setPageCount2] = useState(0);
    const [itemsPerPage2, setItemsPerPage2] = useState(4)
    const [itemOffset2, setItemOffset2] = useState(0);

    useEffect(() => {
        let userData = localStorage.getItem("data");
        userData = JSON.parse(userData);
        axios
            .get("/api/v1/get_user?user_id=" + userData.id)
            .then((res) => (setUser(res.data), setUserPoints(res.data.points), setCurrentBadge(res.data.badge), setCurrentTitle(res.data.title), setUsername(res.data.username)))
            .catch((error) => {
                setError(
                    "No userdata"
                );
            })
    }, [])

    useEffect(() => {

    }, [currentBadge, currentTitle, userPoints, user])

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(badges.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(badges.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % badges.length;
        console.log(
          `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset2 + itemsPerPage2;
        console.log(`Loading items from ${itemOffset2} to ${endOffset}`);
        setCurrentItems2(titles.slice(itemOffset2, endOffset));
        setPageCount2(Math.ceil(titles.length / itemsPerPage2));
    }, [itemOffset2, itemsPerPage2]);

      // Invoke when user click to request another page.
    const handlePageClick2 = (event) => {
        const newOffset = (event.selected * itemsPerPage2) % titles.length;
        console.log(
          `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset2(newOffset);
    };

    const onClickBuyBadge = (e) => {
        let response = window.confirm("Purchase selected badge? Cost: 100 points")
        if (response && user.points >= badgeCost){
            setCurrentBadge(e)
            updateUserBadge(e)
            setUserPoints(userPoints-badgeCost)
        }
        else if (response && user.points < badgeCost){
            alert("Not enough points")
        }
        
    }

    const onClickBuyTitle = (e) => {
        let response = window.confirm("Purchase selected title? Cost: 100 points")
        if (response && user.points >= titleCost){
            setCurrentTitle(e)
            updateUserTitle(e)
            setUserPoints(userPoints-titleCost)
        }
        else if (response && user.points < titleCost){
            alert("Not enough points")
        }
    }

    const updateUserBadge = async (e) => {
        let res = await FetchApiPost("/api/v1/editBadge", {
            userId: user._id,
            badge: e,
            points: user.points - badgeCost,
        });
    }

    const updateUserTitle = async (e) => {
        let res = await FetchApiPost("/api/v1/editTitle", {
            userId: user._id,
            title: e,
            points: user.points - titleCost,
        });
    }

    const onClickPreviewBadge = (e) => {
        setCurrentBadge(e)
    }

    const onClickPreviewTitle = (e) => {
        setCurrentTitle(e)
    }

    function BadgeItems(props) {
        return (
          <div className="badgeItemsToBuy">
          {props.currentItems && props.currentItems.map( (badge, index) => 
                        <div className="storeBadges">
                            <p style={{ textAlign: "center", color: "#929292" }}>{badgeNames[props.itemOffset + index]}</p>
                            <input type="image" src={badge} alt={index} onClick={ () => onClickBuyBadge(badge)}></input>                        
                            <button onClick={() => onClickPreviewBadge(badge)}>preview</button>
                        </div>
                    )}
          </div>
        );
    }

    function TitleItems(props) {
        return (
          <div className="titleItemsToBuy">
          {props.currentItems && props.currentItems.map((title) => 
                        <div className="storeTitles">
                            <button onClick={() => onClickBuyTitle(title)}>{title}</button>
                            <div className="titlePreview">
                                <button onClick={() => onClickPreviewTitle(title)}>preview</button>
                            </div>
                        </div>
                    )}
          </div>
        );
    }

    return(
        <div className="storePage">
            <div className="storeHeader">
                <div className="storePoints">{userPoints}<p> Points</p></div>
                <div className="userPreview">
                    <div className="userTitle">
                        <p style={{ textAlign: "center"}}>{currentTitle}</p>
                    </div>                    
                    <div className="usernameBadge">
                        <img src={currentBadge}/>
                        <span>{username}</span>
                    </div>
                </div>
            </div>
            <div className="storeContent">
                <p style={{ textAlign: "center"}}>BADGE</p>
                <div className="lineBadge" />
                <div className="badges">
                    <BadgeItems currentItems={currentItems} itemOffset={itemOffset}></BadgeItems>
                    <div className="badgePagination">
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
                </div>
                <div className="titles">
                    <p style={{ textAlign: "center"}}>TITLE</p>
                    <div className="lineTitle" />
                    <TitleItems currentItems={currentItems2}></TitleItems>
                    <div className="badgePagination">
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

export default StoreScreen