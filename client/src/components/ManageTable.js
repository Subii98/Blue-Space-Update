import React, { useState, useEffect } from "react";
import TableRow from "./TableRow.js"

function ManageTable(props){
    const headerMeta = [
        "Rank",
        "Username",
        "Level",
        "Accuracy",
        "Play Count",
    ];

    const [users, setUsers] = useState(props.users);
    const [userRank, setUserRank] = useState();
    const [disableAcc, setDisableAcc] = useState()
    const [disableLv, setDisableLv] = useState()
    const [disableCnt, setDisableCnt] = useState()

    useEffect(()=> {
        if (props.user != undefined){
            setUsers(props.users)
            setUserRank(users.indexOf(users.find( e => e.username == props.user.username))+ 1)
            setDisableCnt(false)
            setDisableLv(false)
            setDisableAcc(true)
        }
    }, [])

    useEffect(() => {
        if (props.user != undefined)
            setUserRank(users.indexOf(users.find( e => e.username == props.user.username))+ 1)
    }, [users])

    const onClickSortLevel = () => {
        setDisableAcc(false)
        setDisableCnt(false)
        setDisableLv(true)
        setUsers(users.sort((b, a) => a.level - b.level))
        setUserRank(users.indexOf(users.find( e => e.username === props.user.username))+ 1)
    }

    const onClickSortPlayCount = () => {
        setDisableAcc(false)
        setDisableLv(false)
        setDisableCnt(true)
        setUsers(users.sort((b, a) => a.playCount - b.playCount))
        setUserRank(users.indexOf(users.find( e => e.username === props.user.username))+ 1)

    }

    const onClickSortAccuracy = () => {
        setDisableCnt(false)
        setDisableLv(false)
        setDisableAcc(true)
        setUsers(users.sort((b, a) => a.totalQuestions !== 0 ? (a.correct / a.totalQuestions) - (b.correct / b.totalQuestions) : 0 - (b.correct / b.totalQuestions)))
        setUserRank(users.indexOf(users.find( e => e.username === props.user.username))+ 1)
    }

    return (
        <div className="leaderboardTable">
            <table>
                <thead style={{opacity: "0%"}}>
                    <tr>
                        <th style={{border: "none"}}>Rank</th>
                        <th style={{border: "none"}}>Username</th>
                        <th style={{border: "none"}}><button>Level</button></th>
                        <th style={{border: "none"}}><button>Accuracy</button></th>
                        <th style={{border: "none"}}><button>Play Count</button></th>
                    </tr>
                </thead>
                <tbody>
                    {props.user ? <TableRow key={0} data={props.user} index={0} userRank={userRank}/> : false}
                </tbody>
            </table>

            {users.length !== 0 && (
            <table>
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>Username</th>
                    <th><button disabled={disableLv} onClick={() => onClickSortLevel()}>Level</button></th>
                    <th><button disabled={disableAcc} onClick={() => onClickSortAccuracy()}>Accuracy</button></th>
                    <th><button disabled={disableCnt} onClick={() => onClickSortPlayCount()}>Play Count</button></th>
                </tr>
                </thead>
                <tbody>
                    {users.map((d, i) => {
                        return (<TableRow key={i} data={d} index={i} userRank={0}/>);
                    }
                    )}
                </tbody>
            </table>
            )}
        </div>
        
    );
}

export default ManageTable;