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
    const [selected, setSelected] = useState();

    useEffect(() => {

    }, [selected])

    const handleClick = (value) => {
        setSelected(value);
    };

    return (
        <div className="helpPage">
            <p style={{ textAlign: "center"}}>HOW CAN WE HELP YOU?</p>
            <div className="helpHeaderButtons">
                <div className="helpButton">
                    <button type="button" style={ selected !== "platform" ? {"color" : "#929292"} : {"color" : "#00AEEF"}} onClick={() => handleClick("platform")}>PLATFORM</button>
                    <div className="helpLine" style={ selected !== "platform" ? {"color" : "#929292"} : {"color" : "#00AEEF"}}/>
                </div>
                <div className="helpButton">
                    <button type="button" style={ selected !== "quiz" ? {"color" : "#929292"} : {"color" : "#00AEEF"}} onClick={() => handleClick("quiz")} value="quiz">QUIZ</button>
                    <div className="helpLine"style={ selected !== "quiz" ? {"color" : "#929292"} : {"color" : "#00AEEF"}}/>
                </div>
                <div className="helpButton">
                    <button type="button" style={ selected !== "leaderboard" ? {"color" : "#929292"} : {"color" : "#00AEEF"}} onClick={(e) => handleClick("leaderboard")}>LEADERBOARD</button>
                    <div className="helpLine" style={ selected !== "leaderboard" ? {"color" : "#929292"} : {"color" : "#00AEEF"}}/>
                </div>
                <div className="helpButton">
                    <button type="button" style={ selected !== "store" ? {"color" : "#929292"} : {"color" : "#00AEEF"}} onClick={() => handleClick("store")}>STORE</button>
                    <div className="helpLine" style={ selected !== "store" ? {"color" : "#929292"} : {"color" : "#00AEEF"}}/>
                </div>
                <div className="helpButton">
                    <button type="button" style={ selected !== "contact" ? {"color" : "#929292"} : {"color" : "#00AEEF"}} onClick={() => handleClick("contact")}>CONTACT</button>
                    <div className="helpLine" style={ selected !== "contact" ? {"color" : "#929292"} : {"color" : "#00AEEF"}}/>
                </div>
            </div>
            {selected === "platform" ? (
                <PlatformHelp></PlatformHelp>
            ) : selected === "quiz" ? (
                <QuizHelp></QuizHelp>
            ) : selected === "leaderboard" ? (
                <LeaderboardHelp></LeaderboardHelp>
            ) : selected === "store" ? (
                <StoreHelp/>
            ) : selected === "contact" ? (
                <ContactHelp/>
            ) : []}
        </div>
    )
    // return (
    //     <div>
    //         <p>HOW CAN WE HELP YOU?</p>
    //         <Grid container sx={{ color: "text.primary" }}>
    //             <Grid item xs={2}>
    //                 <h2
    //                     className={`helpTitle ${selected == 0 ? "selected" : ""}`}
    //                     onClick={() => handleClick(0)}
    //                 >
    //                     Platform
    //                 </h2>
    //             </Grid>
    //             <Grid item xs={2}>
    //                 <h2
    //                     className={`helpTitle ${selected == 1 ? "selected" : ""}`}
    //                     onClick={() => handleClick(1)}
    //                 >
    //                     Quiz
    //                 </h2>
    //             </Grid>
    //             <Grid item xs={3}>
    //                 <h2
    //                     className={`helpTitle ${selected == 2 ? "selected" : ""}`}
    //                     onClick={() => handleClick(2)}
    //                 >
    //                     Leaderboard
    //                 </h2>
    //             </Grid>
    //             <Grid item xs={2}>
    //                 <h2
    //                     className={`helpTitle ${selected == 3 ? "selected" : ""}`}
    //                     onClick={() => handleClick(3)}
    //                 >
    //                     Store
    //                 </h2>
    //             </Grid>
    //             <Grid item xs={2}>
    //                 <h2
    //                     className={`helpTitle ${selected == 4 ? "selected" : ""}`}
    //                     onClick={() => handleClick(4)}
    //                 >
    //                     Contact
    //                 </h2>
    //             </Grid>
    //         </Grid>
    //         {selected == 0 ? [<PlatformHelp></PlatformHelp>] : []}
    //         {selected == 1 ? [<QuizHelp></QuizHelp>] : []}
    //         {selected == 2 ? [<LeaderboardHelp></LeaderboardHelp>] : []}
    //         {selected == 3 ? [<StoreHelp></StoreHelp>] : []}
    //         {selected == 4 ? [<ContactHelp> </ContactHelp>] : []}
    //     </div>
    // );
}

export default Help;

// import React from 'react';
// import Box from '@mui/material/Box';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';

// function Help() {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
//       <Tabs value={value} onChange={handleChange} centered>
//         <Tab label="Platform" />
//         <Tab label="Quiz" />
//         <Tab label="Leadboard" />
//         <Tab label="Store" />
//         <Tab label="Contact" />
//       </Tabs>
//     </Box>
//   );
// }

// export default Help;
