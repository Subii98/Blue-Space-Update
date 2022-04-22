import React from 'react'
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { GlobalStoreContext } from "../store";
import LoginComponent from "./Login";
import LogoutComponent from "./Logout";
import LoginHamburger from "./LoginHamburger";

function Header(props) {
    const { store } = useContext(GlobalStoreContext);
    const [data, setData] = useState(store.search);
    const [openMiniProfile, setOpenMiniProfile] = useState(false)
    const [user, setUser] = useState()
    const [error, setError] = useState()
    let history = useHistory();
    //const loginData = localStorage.getItem('data');
    /*
    if (loginData){
      if (!store.loggedIn){
        console.log("entered loginData assignment: ", loginData);
        store.logIn(loginData);
      }
    } */
  
    let userName = "";
    if (store.loggedIn){
      userName = store.username;
    }
    //console.log('username for header: ', userName);

    useEffect(() => {
      if (store.loggedIn){
        let userData = localStorage.getItem("data");
        userData = JSON.parse(userData);
        axios
            .get("/api/v1/get_user/" + userName)
            .then((res) =>  setUser(res.data))
            .catch((error) => {
                setError(
                    "No userdata"
                );
            })
      }
    }, [])

    useEffect(() => {
      if (store.loggedIn){
        let userData = localStorage.getItem("data");
        userData = JSON.parse(userData);
        axios
            .get("/api/v1/get_user/" + userName)
            .then((res) =>  setUser(res.data))
            .catch((error) => {
                setError(
                    "No userdata"
                );
            })
      }

    }, [openMiniProfile, store.loggedIn])

    useEffect(() => {

    }, [user])

    const handleSubmit = (event) => {
      event.preventDefault();
      store.setSearch(data);
      console.log("printing search query: ", store.search);
      /*if (data.length == 0){
        data = undefined;
      }*/
      let queryString = "search=" + data;
      history.push("/search");
      //history.push(`/search?${queryString}`);
    }

    const onClickMiniProfile = () => {
      if (openMiniProfile)
        setOpenMiniProfile(false)
      else
        setOpenMiniProfile(true)
    }

    const onClickCloseMiniProfile = () => {
      setOpenMiniProfile(false)
    }

    return (
      <header>
        <div className="all">
          <a href="/">
            <img
              src="/images/logo11.png"
              className="logo"
              alt="logo"
              width="85"
            />
          </a>
          <div className="headerItems">
            <div className="topLine">
              <div className="searchBar">
                <form className="searchForm" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="search"
                    className="searchInput"
                    placeholder="search categories"
                    id="searchInput"
                    onChange={(e) => setData(e.target.value)}
                  />
                  <button type="submit">
                    <img src="/images/magnifyingglass.png" width="13" />
                  </button>
                </form>
              </div>
              <div className="login">
                
              </div>
            </div>
            <div className="mainButtons">
              {!store.loggedIn ? 
              [<Link to="/categories">
                <button type="button">CATEGORIES</button>
              </Link>,
              <LoginHamburger>
                <button type="button">CREATE</button>
              </LoginHamburger>,
              <LoginHamburger>
                <button type="button">LEADERBOARD</button>
              </LoginHamburger>,
              <LoginHamburger>
                <button type="button">STORE</button>
              </LoginHamburger>,
              <Link to="/help">
                <button type="button">HELP</button>
              </Link>]
              :
              [<Link to="/categories">
                <button type="button">CATEGORIES</button>
              </Link>,
              <Link to="/createplatform">
                <button type="button">CREATE</button>
              </Link>,
              <Link to="/leaderboard">
                <button type="button">LEADERBOARD</button>
              </Link>,
              <Link to="/store">
                <button type="button">STORE</button>
              </Link>,
              <Link to="/help">
                <button type="button">HELP</button>
              </Link>]
              
               }
            </div>
          </div>
          <div className="loginButtons">
            {!store.loggedIn ? <LoginComponent />
              : store.loggedIn && !openMiniProfile ? <img className="profileThumb" src={user && user.userImage} onClick={() => onClickMiniProfile()}/>
              : store.loggedIn && openMiniProfile ?
                <div className="miniProfile">
                  <div className="userPreview">
                    <div className="userImage">
                    </div>                    
                    <div className="usernameBadge">
                      <img src={user && user.badge}/>
                      <span onClick={() => onClickMiniProfile()}>{userName}</span>
                    </div>
                  </div>
                  <Link className="redirectMyPage" to="/MyPage" onClick={() => onClickCloseMiniProfile()}>
                    <img src="/images/icon/smile.png" alt="smile"/>
                    <p>My Page</p>
                  </Link>
                  <div className="redirectLogout">
                    <img src="/images/icon/logout.png" alt="logout"/>
                    <LogoutComponent onClick={() => onClickCloseMiniProfile()}/>
                  </div>
                </div>
              : false}
          </div>
        </div>
      </header>
    );
}

export default Header
