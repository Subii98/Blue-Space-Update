import React, { useState, useEffect } from "react";

const TableRow = ({ key, data, index, userRank}) => {
    const [RowData, setRowData] = useState(data);
    const [rank, setRank] = useState(index+1)

    useEffect(()=>{
        setRowData(data)
    }, [key, data])

    return (
        <>
        <tr key={key}>
            <td>{userRank!=0 ? userRank : rank}</td>
            <td className="leaderboardProfile">
                <th className="leaderboardTitle">{RowData.title}</th>
                <th className="leaderboardBadge">
                    <td><img src={RowData.badge}></img></td>
                    <td>{RowData.username}</td>
                </th>
            </td>
            <td>{RowData.level} </td>
            <td>{RowData.totalQuestions != 0 ? Math.round(( RowData.correct / RowData.totalQuestions) * 100) : 0}%</td>
            <td>{RowData.playCount}</td>
        </tr>
        </>
    )
};


export default TableRow;