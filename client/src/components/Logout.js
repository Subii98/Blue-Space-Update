import React from 'react'
import { useContext, useEffect, useState } from "react";
import { GlobalStoreContext } from "../store";
import { GoogleLogout } from "react-google-login";
import { OAuthClientID } from "../utils/oauth";

const clientId = OAuthClientID;


function Logout() {
  const { store } = useContext(GlobalStoreContext);

    const onSuccess = () => {
      console.log("Logout made successfully");
      //alert("Logout made successfully ✌");
      
      const res = fetch("/api/v1/auth/logout", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      
      store.logOut();
      localStorage.clear();
      
    };
    return (
      <>
        <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
        render={(renderProps)=>{
          return (
            <a className="logoutButton" onClick={renderProps.onClick} style={{fontSize: "1.5rem"}}>Log Out</a>
          )
        }}
      />
      </>
    );
}

export default Logout



