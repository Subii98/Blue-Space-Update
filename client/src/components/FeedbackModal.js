import React, {useState} from "react";
import { Button, TextField } from "@mui/material";
import "../Modal.css";

function FeedbackModal({ closeModal }) {
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">Report a Problem</div>
                <div className="body">
                    <div>
                    <input type="checkbox" /> Abusive
                                        
                    </div>
                    <TextField label="Feedback" />
                </div>
                <div className="footer">
                    <Button>Submit</Button>
                    <Button onClick={() => closeModal(false)}>Cancel</Button>
                </div>
            </div>
        </div>
    );
}

export default FeedbackModal;
