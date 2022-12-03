import React from "react";
import { useContext, useEffect, useState } from "react";
import { GlobalStoreContext } from "../store";
// refresh token
import { refreshTokenSetup } from "../utils/refreshToken";
import GoogleLogin from "./GoogleLogin";

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

function Login() {
    const { store } = useContext(GlobalStoreContext);
    const [signedIn, setSignedIn] = useState(0);

    const onSuccess = async googleData => {
        console.log("googleData : ", googleData);

        const res = await fetch("/api/v1/auth/google", {
            method: "POST",
            body: JSON.stringify({
                token: googleData.credential,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        refreshTokenSetup(googleData);

        const data = await res.json();

        if (res.status == 200) {
            localStorage.setItem("signed-in", true);
            localStorage.setItem("data", JSON.stringify(data));
            store.logIn(data);
        }

        // store returned user somehow
    };

    const onFailure = res => {
        console.log("[Login failed] res: ", res);
    };

    return (
        <>
            <GoogleLogin onSuccess={onSuccess} onFailure={onFailure} />
        </>
    );
}

export default Login;
