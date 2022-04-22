import axios from "axios";
import React, { useState, useEffect } from "react";
import QuizScore from "./QuizScore.js";
import { FetchApiPost } from "../utils/Network";
import Timer from "../components/Timer.js";
import Statistics from "./Statistics.js";
import { set } from "mongoose";

function Question(props) {
    const [user, setUser] = useState()
    const [index, setIndex] = useState(0);
    const [questions, setQuestions] = useState();
    const [question, setQuestion] = useState();
    const [checked, setChecked] = useState(false);
    const [disable, setDisable] = useState(false);
    const [addTimeDisable, setAddTimeDisable] = useState(false)
    const [hintDisable, setHintDisable] = useState(false)
    const [endQuiz, setEndQuiz] = useState(false);
    //const [option, setOption] = useState("");
    const [first, setFirst] = useState();
    const [second, setSecond] = useState();
    const [third, setThird] = useState();
    const [fourth, setFourth] = useState();
    const [count, setCount] = useState(0);
    const [platformId, setPlatformId] = useState();
    const [error, setError] = useState(false);
    const [timeOut, setTimeOut] = useState(false)
    const [correct, setCorrect] = useState(false)
    const [defaultTime, setDefaultTime] = useState(10)
    const [hintCount, setHintCount] = useState(0)
    const [usedPoints, setUsedPoints] = useState(0)
    const [likes, setLikes] = useState(0)
    

    //const question = questions[index]

    useEffect(() => {
        axios
            .get("/api/quizzes")
            .then(res => {
                const data = res?.data;
                setPlatformId((data.find( x => x._id === props.question[0].quizId).platformId))
                setLikes((data.find( x => x._id === props.question[0].quizId).likes))
                return;
            })
            .catch(error => {
                setError("Error finding quiz");
                console.log("Error finding quiz");
            });
        let userData = localStorage.getItem("data");
        userData = JSON.parse(userData);
        axios
            .get("/api/v1/get_user?user_id=" + userData.id)
            .then((res) => setUser(res.data))
            .catch((error) => {
                setError(
                    "No userdata"
                );
            })
    }, [])

    useEffect(() => {
        setUsedPoints(0)
        if(props.question && props.question.length > 0){
            setQuestions(props.question);
            setQuestion(props.question[0]);
            setFirst(props.question[0].first)
            setSecond(props.question[0].second)
            setThird(props.question[0].third)
            setFourth(props.question[0].fourth)
        }
    }, [ props.question ]);

    useEffect(() => {
        if(questions){
            setQuestion(questions[index]);
            setFirst(question.first);
            setSecond(question.second);
            setThird(question.third);
            setFourth(question.fourth);
            setChecked(false)
            setTimeOut(false)
            setDefaultTime(10)
            setAddTimeDisable(false)
            setHintDisable(false)
            setHintCount(0)
        }
    }, [index]);

    useEffect(() => {
        if (timeOut)
            setChecked(true)
            setDisable(timeOut)
            setAddTimeDisable(timeOut)
            setHintDisable(timeOut)
            setHintCount(0)
    }, [timeOut])

    useEffect(()=> {
        if (hintCount == 3)
            setHintDisable(true)
    }, [checked, addTimeDisable, hintCount])

    const onClickSaveCheckAnswer = e => {
        console.log(question)
        e.preventDefault();
        setTimeOut(true)
        var ele = document.getElementsByTagName("input");
        for (var i = 0; i < ele.length; i++) {
            if (ele[i].type == "radio") {
                if (ele[i].checked && ele[i].value == question.answer) {
                    setDisable(true);
                    setChecked(true);
                    setCount(count + 1);
                    setCorrect(true)
                    setAddTimeDisable(true)
                    const option = ele[i].value;
                    if (option == "1") {
                        setFirst(first + 1);
                    } else if (option == "2") {
                        setSecond(second + 1);
                    } else if (option == "3") {
                        setThird(third + 1);
                    } else if (option == "4") {
                        setFourth(fourth + 1);
                    }
                } else if (ele[i].checked) {
                    setDisable(true);
                    setChecked(true);
                    const option = ele[i].value;
                    if (option == "1") {
                        setFirst(first + 1);
                    } else if (option == "2") {
                        setSecond(second + 1);
                    } else if (option == "3") {
                        setThird(third + 1);
                    } else if (option == "4") {
                        setFourth(fourth + 1);
                    }

                }
            }            
        }
    };

    const onNextClick = async e => {
        e.preventDefault();
        setDisable(false);
        if (checked) {
            let res = await FetchApiPost("/api/questions/edit", {
                questionId: question._id,
                quizId: question.quizId,
                text: question.text,
                option: question.option,
                first: first,
                second: second,
                third: third,
                fourth: fourth,
                questionNum: question.questionNum
            });

            if (index < questions.length - 1) {
                setIndex(index + 1);
                setChecked(false);
                setTimeOut(false)
                setCorrect(false)
            } else if (index == questions.length - 1) {
                setCorrect(false)
                setEndQuiz(true);
            }
        }
    };

    const onClickAddTime = e => {
        e.preventDefault()
        setDefaultTime(defaultTime + 5)
        setTimeOut(false)
        setUsedPoints(usedPoints + 50)
    }

    const onClickHint = e => {
        e.preventDefault()
        setHintCount(hintCount+1)
        setUsedPoints(usedPoints + 50)
        var ele = document.getElementsByTagName("input");
        console.log(ele)
        var i = Math.floor(Math.random() * (ele.length - 1) + 1)
        console.log(i)
        if (ele[i].type == "radio" && ele[i].value != question.answer && ele[i].disabled != true){
            ele[i].disabled = true
        }
        else{
            while (true){
                console.log("len",ele.length)
                i = Math.floor(Math.random() * (ele.length - 1) + 1)
                console.log(i)
                if (ele[i].type == "radio" && ele[i].value != question.answer && ele[i].disabled != true){
                    ele[i].disabled = true
                    return
                }
                else{
                    continue
                }
            }
                
        }

    }

    if(question == undefined) return ( <div>LOADING..</div>)
    if (!endQuiz) {
        return (
            <div className="quizArea">
                <div className= "quizHeader">
                    <p>Question {index+1}</p>
                    <Timer time={defaultTime} timeOut={timeOut} setTimeOut={setTimeOut} setDefaultTime={setDefaultTime}/>
                </div>
                <form className="questions">
                    <span key={question._id} className="question">
                        {question.text}
                    </span>
                    <br />
                    <div className="options">
                        {question.option.length >= 1
                            ? [
                                  <input
                                      type="radio"
                                      id="option1"
                                      name="option"
                                      value={question.option[0]}
                                      disabled={disable}
                                  ></input>,
                                  <label for="option1">{question.option[0]}</label>,
                                  <br />,
                              ]
                            : []}
                        {question.option.length >= 2
                            ? [
                                  <input
                                      type="radio"
                                      id="option2"
                                      name="option"
                                      value={question.option[1]}
                                      disabled={disable}
                                  ></input>,
                                  <label for="option2">{question.option[1]}</label>,
                                  <br />,
                              ]
                            : []}
                        {question.option.length >= 3
                            ? [
                                  <input
                                      type="radio"
                                      id="option3"
                                      name="option"
                                      value={question.option[2]}
                                      disabled={disable}
                                  ></input>,
                                  <label for="option3">{question.option[2]}</label>,
                                  <br />,
                              ]
                            : []}
                        {question.option.length >= 4
                            ? [
                                  <input
                                      type="radio"
                                      id="option4"
                                      name="option"
                                      value={question.option[3]}
                                      disabled={disable}
                                  ></input>,
                                  <label for="option4">{question.option[3]}</label>,
                                  <br />,
                              ]
                            : []}
                    </div>
                    <div className="questionButtons">
                        <button
                            className="save"
                            disabled={disable}
                            type="submit"
                            onClick={e => {
                                onClickSaveCheckAnswer(e);
                            }}
                        >
                            SAVE
                        </button>
                        <div className="pointButtons">
                            <button className="addTime" disabled={addTimeDisable} onClick={e => { onClickAddTime(e)}}><img src="/images/timer.png"/>5s</button>
                            <button className= "hint" disabled={hintDisable} onClick={e => {onClickHint(e)}}><img src="/images/big-light.png"/>HINT</button>
                        </div>
                        <div className="questionArrow">
                            <button disabled={!disable} onClick={e => {onNextClick(e)}}>NEXT</button>
                        </div>
                    </div>
                </form>
                {checked ? <Statistics question={question} correct={correct}/> : null}
            </div>
        );
    } else {
        return <QuizScore quizID={props.quizID} questions={questions} count={count} platformId={platformId} user={user} usedPoints={usedPoints} likes={likes}/>;
    }
}

export default Question;
