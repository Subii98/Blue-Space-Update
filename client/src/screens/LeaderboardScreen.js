import axios from "axios";
import React, { useState, useEffect } from "react";
import ManageTable from "../components/ManageTable.js";

function LeaderboardScreen(){
    const [user, setUser] = useState()
    const [users, setUsers] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let userData = localStorage.getItem("data");
        userData = JSON.parse(userData);
        axios
            .get("/api/v1/get_user?user_id=" + userData.id)
            .then((res) => (setUser(res.data)))
            .catch((error) => {
                setError(
                    "No userdata"
                );
            })
        axios
            .get("/api/v1")
            .then(res => {
                setLoading(true);
                setUsers(res.data.sort((b, a) => a.totalQuestions !== 0 ? (a.correct / a.totalQuestions) - (b.correct / b.totalQuestions) : 0 - (b.correct / b.totalQuestions)))
                setLoading(false);
                return;
            })
            .catch(error => {
                setError("Error loading users");
                setLoading(false);
                console.log("Error loading users");
            });
    }, [])

    return(
        <div>
            {users != undefined ? <ManageTable user={user} users={users}/> : false}
        </div>
        
    )
}

export default LeaderboardScreen