import { set } from 'mongoose';
import React from 'react'
import { useState, useEffect } from 'react';

function Timer(props) {
    const [initialSeconds] = useState(props.time)
    const initialMinute = 0
    const [minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] = useState(initialSeconds);
    const setTimeOut = props.setTimeOut
    const timeOut = props.timeOut
    const setCurrentTime = props.setDefaultTime

    useEffect(()=>{
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
                setCurrentTime(seconds - 1)
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    setInterval(0)
                    clearInterval(myInterval)
                    setTimeOut(true)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                    setCurrentTime(seconds - 1)
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

    useEffect(()=> {
        if (!timeOut)
            setSeconds(initialSeconds)
    }, [timeOut])

    useEffect(() => {
        setSeconds(props.time)
    }, [props.time])

    

    return (
        <div className="timer">
            <img src="/images/timer.png" alt="timer"></img>
            { minutes === 0 && seconds === 0
                ? <p> 0:00 </p> 
                : <p> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</p> 
            }
        </div>
    )
}

export default Timer;