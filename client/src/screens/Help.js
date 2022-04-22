import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useState, useContext, useEffect } from "react";
import CollapsibleContent from "../components/HelpPage/CollapsibleContent.js";
import ContactHelp from "../components/HelpPage/ContactHelp.js";
import PlatformHelp from "../components/HelpPage/PlatformHelp.js";
import LeaderboardHelp from "../components/HelpPage/LeaderboardHelp.js";
import StoreHelp from "../components/HelpPage/StoreHelp.js";
import QuizHelp from "../components/HelpPage/QuizHelp.js";

function Help() {
    const [selected, setSelected] = useState(0);

    const handleClick = e => {
        setSelected(e);
        console.log("value of e: ", e);
    };
    return (
        <div>
            <Grid container sx={{ color: "text.primary" }}>
                <Grid item xs={2}>
                    <h2
                        className={`helpTitle ${selected == 0 ? "selected" : ""}`}
                        onClick={() => handleClick(0)}
                    >
                        Platform
                    </h2>
                </Grid>
                <Grid item xs={2}>
                    <h2
                        className={`helpTitle ${selected == 1 ? "selected" : ""}`}
                        onClick={() => handleClick(1)}
                    >
                        Quiz
                    </h2>
                </Grid>
                <Grid item xs={3}>
                    <h2
                        className={`helpTitle ${selected == 2 ? "selected" : ""}`}
                        onClick={() => handleClick(2)}
                    >
                        Leaderboard
                    </h2>
                </Grid>
                <Grid item xs={2}>
                    <h2
                        className={`helpTitle ${selected == 3 ? "selected" : ""}`}
                        onClick={() => handleClick(3)}
                    >
                        Store
                    </h2>
                </Grid>
                <Grid item xs={2}>
                    <h2
                        className={`helpTitle ${selected == 4 ? "selected" : ""}`}
                        onClick={() => handleClick(4)}
                    >
                        Contact
                    </h2>
                </Grid>
            </Grid>
            {selected == 0 ? [<PlatformHelp></PlatformHelp>] : []}
            {selected == 1 ? [<QuizHelp></QuizHelp>] : []}
            {selected == 2 ? [<LeaderboardHelp></LeaderboardHelp>] : []}
            {selected == 3 ? [<StoreHelp></StoreHelp>] : []}
            {selected == 4 ? [<ContactHelp> </ContactHelp>] : []}
        </div>
    );
}

export default Help;
