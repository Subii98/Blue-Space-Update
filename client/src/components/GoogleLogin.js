import { useEffect } from "react";
// import { gapi } from "gapi-script";
// import { GoogleLogin } from "react-google-login";
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";

import { OAuthClientID } from "../utils/oauth";
const clientId = OAuthClientID;

function GoogleLoginComp(props) {
    // useEffect(() => {
    //     const initClient = () => {
    //         gapi.client.init({
    //             clientId: clientId,
    //             scope: "",
    //         });
    //     };
    //     gapi.load("client:auth2", initClient);
    // }, []);

    return (
        <>
            {/* <GoogleLogin
                clientId={clientId}
                buttonText="Log in with Google"
                onSuccess={onSuccess}
                onFailure={err => console.log('fail', err)}
                // onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
                render={renderProps => {
                    return (
                        <div className="nButton" onClick={renderProps.onClick}>
                            LOGIN
                        </div>
                    );
                }}
            /> */}
            <GoogleOAuthProvider clientId="708689825070-6m8dt0chib1qbvnasg843au6t9rq2ii6.apps.googleusercontent.com">
                <GoogleLogin onSuccess={props.onSuccess} onError={()=>console.log("error?")} />
            </GoogleOAuthProvider>
        </>
    );
}

export default GoogleLoginComp;
