import React from 'react'
import { useContext, useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function CollapsibleContent(props) {

    const [expanded, setExpanded] = useState(false);
    const {title, children} = props;
    const handleSubmit = e => {
        e.preventDefault();
        setExpanded(!expanded);

        //history.push("/search");
    };
    return (
        <div className={`panel ${expanded ? "is-expanded" : ""}`} onClick={handleSubmit}>
            <div className="panel-heading ">
                <h2 className="panel-title">{title}</h2>
                {expanded
                    ? [<KeyboardArrowDownIcon className="arrow" sx={{ fontSize: 36 }}></KeyboardArrowDownIcon>]
                    : [<KeyboardArrowUpIcon className="arrow" sx={{ fontSize: 36 }}></KeyboardArrowUpIcon>]}
            </div>
            <div className="panel-collapse">{children}</div>
        </div>
    );
}

export default CollapsibleContent
