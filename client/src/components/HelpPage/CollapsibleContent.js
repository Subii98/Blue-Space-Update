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
                <div className="panel-title">{title}</div>
                {expanded
                    ? [<KeyboardArrowUpIcon className="arrow" sx={{ fontSize: 22 }}></KeyboardArrowUpIcon>]
                    : [<KeyboardArrowDownIcon className="arrow" sx={{ fontSize: 22 }}></KeyboardArrowDownIcon>]}
            </div>
            <div className="panel-collapse">{children}</div>
        </div>
    );
}

export default CollapsibleContent
