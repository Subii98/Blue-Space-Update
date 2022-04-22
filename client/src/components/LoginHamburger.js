import React from 'react';
import { useContext, useEffect, useState} from "react";
import { GlobalStoreContext } from "../store";
import {GoogleLogin} from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../utils/refreshToken';

const clientId = '506755665568-6jjmmjkcpuc4of62a2s5idulrbuebr69.apps.googleusercontent.com';


/*
function Login() {
    const onSuccess = (res) => {
        console.log('[Login Success] currentUser:' , res.profileObj);
    };
    const onFailure = (res) => {
        console.log('[Login failed] res:', res);
    };
    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop:'100px'}}
                isSignedIn={true}
                />
        </div>
    )
}

//export default Login


*/


function LoginHamburger(props) {
  const { store } = useContext(GlobalStoreContext);
  const [signedIn, setSignedIn] = useState(0);

  


  const onSuccess = async googleData => {  
      //console.log(googleData);
      
        const res = await fetch("/api/v1/auth/google", {
            method: "POST",
            body: JSON.stringify({
                token: googleData.tokenId
            }),
    headers: {
      "Content-Type": "application/json"
    }
    
  });
  refreshTokenSetup(googleData);

  console.log("logged in");  
  
  const data = await res.json();
  console.log("message:", res.message);
  console.log("data var: ", data);
  
  if (res.status == 200){
      localStorage.setItem("signed-in", true);
      localStorage.setItem("data", JSON.stringify(data));
      store.logIn(data);
  }
  
  
  // store returned user somehow
}

  const onFailure = (res) => {
    console.log('[Login failed] res: ', res)
  }
    return (
      <>
        <GoogleLogin
          clientId={clientId}
          buttonText="Log in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
          render={(renderProps)=>{
            return (
              <div className="nButton" onClick={renderProps.onClick}>
                  {props.children}
              </div>
            )
          }}
        />
      </>
    );
}

export default LoginHamburger
