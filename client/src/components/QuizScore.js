import { CallReceivedOutlined } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import { FetchApiPost } from '../utils/Network';
import axios from "axios";

function QuizScore(props){
    const user = props.user
    const [questions, setQuestions] = useState(props.questions)
    const [platformId, setPlatformId] = useState(props.platformId)
    const [level, setLevel] = useState(props.user.level)
    const [expRate] = useState(3)
    const [levelUp, setLevelUp] = useState(false)
    const [expBarAmount, setExpBarAmount] = useState() 
    const [disableThumbUp, setDisableThumbUp] = useState(false)
    const [disableThumbDown, setDisableThumbDown] = useState(false)
    const [quizDetails, setQuizDetails] = useState(); //used for creation of recent quiz
    const [likes, setLikes] = useState(props.likes)

    console.log("quiz ID for quizscore is ", props.quizID);
    const history = useHistory();

    useEffect(()=> {
        calcLevel()
    }, [])

    useEffect (() => {
        editPoints()
    }, [level, expBarAmount, levelUp ,disableThumbDown, disableThumbUp, likes])

    function calcLevel(){
        const tmpExp = props.user.exp + (props.count * expRate)

        if ( 0 <= tmpExp && tmpExp <= 15){
            setLevel(1)
            setExpBarAmount( (tmpExp / 15) * 100)
            if ((tmpExp / 15) * 100 >= 100){
                setLevel(level + 1)
                setLevelUp(true)
                setExpBarAmount(( ((tmpExp / 15) * 100) -100) / 49)
            }
        }
        else if ( 15 < tmpExp && tmpExp <= 49){
            setLevel(2)
            setExpBarAmount( (tmpExp / 49) * 100)
            if ((tmpExp / 49) * 100 >= 100){
                setLevel(level + 1)
                setLevelUp(true)
                setExpBarAmount(( ((tmpExp / 49) * 100) -100) / 106)
            }
        }
        else if ( 49 < tmpExp && tmpExp <= 106){
            setLevel(3)
            setExpBarAmount( (tmpExp / 106) * 100)
            if ((tmpExp / 106) * 100 >= 100){
                setLevel(level + 1)
                setLevelUp(true)
                console.log("3")
                setExpBarAmount(( ((tmpExp / 106) * 100 )-100) / 198)
            }
        }
        else if ( 106 < tmpExp && tmpExp <= 198){
            setLevel(4)
            setExpBarAmount( (tmpExp / 198) * 100)
            if ((tmpExp / 198) * 100 >= 100){
                setLevel(level + 1)
                setLevelUp(true)
                setExpBarAmount(( ((tmpExp / 198) * 100) -100) / 333)
            }
        }
        else if ( 198 < tmpExp && tmpExp <= 333){
            setLevel(5)
            setExpBarAmount( (tmpExp / 333) * 100)
            if ((tmpExp / 333) * 100 >= 100){
                setLevel(level + 1)
                setLevelUp(true)
                setExpBarAmount(( ((tmpExp / 333) * 100)-100) / 705)
            }
        }
        else if ( 333 < tmpExp && tmpExp <= 705){
            setLevel(6)
            setExpBarAmount( (tmpExp / 705) * 100)
            if ((tmpExp / 705) * 100 >= 100){
                setLevel(level + 1)
                setLevelUp(true)
                setExpBarAmount(99.9)
            }
        }
        else {
            setLevel(7)
            setExpBarAmount( 99.9)
        }
    }

    const editPoints = async () => {
        let res = await FetchApiPost("/api/v1/editPoints", {
            userId: user._id,
            points: user.points - props.usedPoints + (props.count * 10),
            correct: user.correct + props.count,
            totalQuestions: user.totalQuestions + questions.length,
            playCount: user.playCount + 1,
            exp: user.exp + (props.count * expRate),
            level: level
        });
        axios
            .get("/api/quizzes/get_quiz/" + props.quizID)
            .then(res => {
                setQuizDetails(res);
                console.log("entered quiz details");
                return;
            })
            .catch(error => {
                console.log("Error loading quiz");
            });
        
    }

    const editLikes = async () => {
        let res = await FetchApiPost("/api/quizzes/editLikes", {
            quizId: props.quizID,
            likes: likes
        })
    }
    //saves a record in recent quizzes
    const record = async () => {
        console.log("quizdetails info" , quizDetails);
        console.log("quiz id is " , props.quizID);
        let res = await FetchApiPost("/api/recentquiz/record", {
            userID: user._id,
            quizID: props.quizID,
            name: quizDetails.data.title,
            correct: props.count,
            total: questions.length,
        });
    }
    useEffect(() => {
       if (quizDetails){
            record();
       }
    }, [quizDetails]);


    const onClickClose = () => {
        console.log("back to platform page")
        editLikes()
        history.push("/platform/" + platformId);
    }

    const onClickDisableThumbUp = () => {
        setDisableThumbUp(true)
        setDisableThumbDown(false)
        setLikes(likes+1)
    }

    const onClickDisableThumbDown = () => {
        setDisableThumbUp(false)
        setDisableThumbDown(true)
        setLikes(likes-1)
    }

    return(
        <div className="score">
            <div className="scoreHeader">            
                <div className='quizScoreUserInfo'>
                    <div className="centered">Score</div>
                    <img className="confetti" src="/images/confetti.png" alt="confetti"/>
                    <div className='userImage2'>
                        <img src={user.userImage}/>
                    </div>
                    <div className="userPreview2">                
                        <div className="userTitle2">
                            <p style={{ textAlign: "center"}}>{user.title}</p>
                        </div>                    
                        <div className="usernameBadge2">
                            <img src={user.badge}/>
                            <span>{user.username}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="scoreText">
                <p>Questions Correct</p>
                <div className="correctCount">
                    <div className="scoreInfoBlue">{props.count}</div>
                    <div className="scoreInfo">/{questions.length}</div>
                </div>
                
            </div>
            <div className="scoreText">
                <p>Points Spent</p>
                <div className="scoreInfo">-{props.usedPoints}</div>
            </div>
            <div className="scoreText">
                <p>Points Earned</p>
                <div className="scoreInfoBlue">+{props.count * 10}</div>
            </div>                
            <div className="expAndLevel">
                <div className="levelUpInfo">
                    {levelUp ? <div className="expCount" style={{textAlign:'left', opacity: "100%"}}>
                        <p>Level Up!</p>
                    </div> : <div className="expCount" style={{textAlign:'left', opacity: "0%"}}>
                        <p>Level Up!</p>
                    </div>}
                    <div className="expCount" style={{textAlign:'right'}}>
                        <p>+{props.count * expRate}exp</p>
                    </div>
                </div>
                <div className="expBarWithLevel">
                    <p>Lv.{level}</p>
                    <div className="expBarContainer">
                        <div className="expBar rate" style={{width: `${expBarAmount}%`}}></div>
                    </div>
                </div>
            </div>
            <div className="rateQuizContents">
                <div className="rateQuizText">Rate this quiz!</div>
                <div className="rateThumbs">
                    <button disabled={disableThumbUp} onClick={() => onClickDisableThumbUp()}><img src="/images/icon/thumb-up.png" /></button>
                    <button disabled={disableThumbDown} onClick={() => onClickDisableThumbDown()}><img src="/images/icon/thumb-down.png" /></button>
                </div>
            </div>
        
            
            <button type="button" onClick={onClickClose}>CLOSE</button>
        </div>
    )
}
export default QuizScore