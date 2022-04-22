import React from 'react'
import { useContext, useEffect, useState } from "react";
import { GlobalStoreContext } from "../store";
import { GoogleLogout } from "react-google-login";
const clientId = '506755665568-6jjmmjkcpuc4of62a2s5idulrbuebr69.apps.googleusercontent.com';


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
      console.log("i logged out");
      
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



