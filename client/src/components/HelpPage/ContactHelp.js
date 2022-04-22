import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useContext, useEffect, useState } from "react";

function ContactHelp() {
    return (
        <div>
            <Grid container sx={{ color: "text.primary" }}>
                <Grid item xs={4}>
                    <EmailIcon sx={{ fontSize: 34 }} />
                </Grid>
                <Grid item xs={8}>
                    <div className="contactText">support_blue@bluespace.com</div>
                </Grid>

                <Grid item xs={4}>
                    <PhoneAndroidIcon sx={{ fontSize: 34 }} />
                </Grid>
                <Grid item xs={8}>
                    <div className="contactText">1 631.123.1234</div>
                </Grid>

                <Grid item xs={4}>
                    <LocationOnIcon sx={{ fontSize: 34 }} />
                </Grid>
                <Grid item xs={8}>
                    <div className="contactText">1234 Red Circle, Stonybrook, NY</div>
                </Grid>
            </Grid>
        </div>
    );
}

export default ContactHelp;
