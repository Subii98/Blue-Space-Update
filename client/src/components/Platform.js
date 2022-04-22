import { SettingsInputAntennaTwoTone } from '@mui/icons-material';
import React, { useState, useEffect } from 'react'
import PlatformCard from './PlatformCard.js'

function Platform(props){
    return(
        <div className="platformCard" style={props.row ? 
            {display:"flex", flexDirection: "row", alignItems:"flex-start", justifyContent:"space-evenly", width: "100%"} 
            : {display:"flex", flexDirection:"column"}}>
        {props.platforms.map((platform)=> (
            <PlatformCard platform={platform} row={props.row}></PlatformCard>)
        )}
        </div>
    )
}

export default Platform