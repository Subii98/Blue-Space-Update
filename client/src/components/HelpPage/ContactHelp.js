import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function ContactHelp() {
    return (
        <div className='contact-sections'>
            <div className='contact-icons'>
                <EmailIcon sx={{ fontSize: 20 }} />
                <PhoneAndroidIcon sx={{ fontSize: 20 }} />
                <LocationOnIcon sx={{ fontSize: 20 }} />
            </div>
            <div className='contact-info'>
                <p>support_blue@bluespace.com</p>
                <p>1 631.123.1234</p>
                <p>450 Circle Rd, Stonybrook, NY</p>
            </div>
        </div>
    );
}

export default ContactHelp;
