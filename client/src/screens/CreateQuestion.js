import React, { useEffect, useState, useContext } from "react";
import { FetchApiGet, FetchApiPost , FetchApiDelete} from "../utils/Network";
import { Button, Typography, TextField } from "@mui/material";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { set } from "mongoose";
import Box from '@mui/material/Box';
import { ConstructionOutlined } from "@mui/icons-material";

function CreateQuestion(props) {
    const history = useHistory();
    console.log(props);
    const [text, setText] = useState("");
    const [answer, setAnswer] = useState("");
    const [optionOne, setOptionOne] = useState("");
    const [optionTwo, setOptionTwo] = useState("");
    const [optionThree, setOptionThree] = useState("");
    const [optionFour, setOptionFour] = useState("");
    const [nextDisabled, setNextDisabled] = useState(true);
    const [backDisabled, setBackDisabled] = useState(true);
    const [questionDisabled, setQuestionDisabled] = useState(true);
    const [deleteDisabled, setDeleteDisabled] = useState(true);
    const [max, setMax] = useState(0);
    const [index, setIndex] = useState(0);

    const [quiz, setQuiz] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [questionID, setQuestionID] = useState(0);
    const [update, setUpdate] = useState(false);

    const [answerError, setAnswerError] = useState(false)
    const [errorOne, setErrorOne] = useState(false)
    const [errorTwo, setErrorTwo] = useState(false)
    const [errorThree, setErrorThree] = useState(false)
    const [errorFour, setErrorFour] = useState(false)
    const [errorText, setErrorText] = useState(false)



    useEffect(() => {
        console.log("updating info");
        setUpdate(false);
        if (props.match.params.quizId) fetchQuiz();
    }, [update]);

    useEffect(() => {
        console.log("index updated");
        if (index == max) {
            setText("");
            setAnswer("");
            setOptionOne("");
            setOptionTwo("");
            setOptionThree("");
            setOptionFour("");
            if (max > 0) {
                setQuestionID(quiz[index - 1].questionNum + 1);
            }
            console.log("Questionid:",questionID);
            console.log("index num:", index);
        } else {
            setText(quiz[index].text);
            setAnswer(quiz[index].answer);
            setOptionOne(quiz[index].option[0]);
            setOptionTwo(quiz[index].option[1]);
            setOptionThree(quiz[index].option[2]);
            setOptionFour(quiz[index].option[3]);
            setQuestionID(quiz[index].questionNum);
        }
    }, [index,quiz]);


    useEffect(()=> {
        setErrorOne(false)
        setErrorTwo(false)
        setErrorThree(false)
        setErrorFour(false)
        setErrorText(false)
        setAnswerError(false)
        if (index <= 0) {
            setBackDisabled(true);
        } else {
            setBackDisabled(false);
        }
        if (index == max){
            setQuestionDisabled(true);
            setNextDisabled(true);
            setDeleteDisabled(true);
        } else {
            setQuestionDisabled(false);
            setNextDisabled(false);
            setDeleteDisabled(false);
        }
    }, [index,max]);

    useEffect(() => {

    }, [answerError, errorOne, errorTwo, errorThree, errorFour, errorText])

    const onBackClick = e => {
        e.preventDefault();
        setAnswerError(false)
        setErrorOne(false)
        setErrorTwo(false)
        setErrorThree(false)
        setErrorFour(false)
        if (index > 0) {
            setIndex(index - 1);
        }
        
    };
    const onDeleteClick = async (e) => {
        e.preventDefault();
        let res = await FetchApiDelete("/api/questions/delete", {
            questionNum: questionID,
        });
        alert('Question deleted');
        if (index != 0){
            setIndex(index-1);
        }
        setUpdate(true);
    };
    const onNextClick = e => {
        e.preventDefault();
        setIndex(index + 1);
    };
    const addQuestion = e => {
        e.preventDefault();
        setIndex(max);
    };

    const onClickSubmit = async (e) => {
        e.preventDefault();
        if (text == ""){
            setErrorText(true)
            setUpdate(false)
        }
        else if (answer == ""){
            setAnswerError(true)
            setUpdate(false)
        }
        else if (optionOne == ""){
            setErrorOne(true)
            setUpdate(false)
        }
        else if (optionTwo == ""){
            setErrorTwo(true)
            setUpdate(false)
        }
        else if (optionThree == ""){
            setErrorThree(true)
            setUpdate(false)
        }
        else if (optionFour == ""){
            setErrorFour(true)
            setUpdate(false)
        }
        else{
            if (answer == optionOne || answer == optionTwo || answer == optionThree || answer == optionFour){
                setAnswerError(false)
                if (index == max) {
                    console.log("create new question");
                    let res = await FetchApiPost("/api/questions/insert", {
                        text: text,
                        option: [optionOne, optionTwo, optionThree, optionFour],
                        answer: answer,
                        quizId: props.match.params.quizId,
                        questionNum: questionID,
                    });
                    setUpdate(true);
                    alert("question added");
                } else {
                    console.log('update new question');
                    let res = await FetchApiPost("/api/questions/upsert", {
                        text: text,
                        option: [optionOne, optionTwo, optionThree, optionFour],
                        answer: answer,
                        quizId: props.match.params.quizId,
                        questionNum: questionID,
                    });
                    setUpdate(true);
                    alert("question modified");
                }
            }
            else{
                e.preventDefault()
                setAnswerError(true)
                setUpdate(false)
            }
        }
        
    };

    function fetchQuiz() {
        axios
            .get("/api/questions/get_question/" + props.match.params.quizId)
            .then(res => {
                //setLoading(true);
                const data = res?.data;
                setMax(data.length);
                console.log("quiz data", data);
                setQuiz(data);
                
                setIndex(0);
                setBackDisabled(true);
                if (max > 0) {
                    setNextDisabled(false);
                }
                //setLoading(false);
                return;
            })
            .catch(error => {
                //setError("Error loading quiz");
                //setLoading(false);
                console.log("Error loading quiz");
            });
    }

    // const platform = async() =>{
    //     // const { data } = await axios.get("/api/platforms/name/"+name);
    //     let quiz = await FetchApiGet("api/quizzes/get_quiz" + props.match.params.quizId)
    //     console.log(quiz)
    // }
    // console.log(props.match.params.quizId)
    // const { data } =  axios.get("api/quizzes/get_quiz" + props.match.params.quizId)
    // console.log(data)

    // useEffect(() => {
    //     axios
    //          .get("/api/quizzes/get_quiz/" + props.match.params.quizId)
    //          .then(res => {
    //              console.log()
    //              console.log("???", res.data)
    //          })
    //          .catch((error) => {

    //    console.log("Error loading home page");
    //          });
    // }, []);

    return (
        <div className="createquiz-main-container">
            {/* <Tags/> */}
            {/* <PostArea/>             */}
            <Typography fontSize="30px" marginBottom="24px">
                Edit Quiz Screen
            </Typography>
            <div className="createquiz-content">
            <Box component="form" autoComplete="off">
                <div className="createquiz-content-block">
                    <TextField
                        error={errorText}
                        helperText={errorText && "Empty Entry"}
                        required                        
                        onChange={e => (setText(e.target.value), e.target.value != "" ? setErrorText(false) : setErrorText(true))}
                        value={text}
                        label= {`Question ${index+1}`}
                        style={{ minWidth: "300px" }}
                        inputProps={{ style: { fontSize: "14px" } }}
                        InputLabelProps={{ style: { fontSize: "12px" } }}
                    />
                    <TextField
                        error={answerError}
                        helperText={answerError && "Answer Not Found In Options"}
                        required
                        onChange={e => (setAnswer(e.target.value), e.target.value != "" ? setAnswerError(false) : setAnswerError(true))}
                        value={answer}
                        label="Answer"
                        style={{ minWidth: "300px" }}
                        inputProps={{ style: { fontSize: "14px" } }}
                        InputLabelProps={{ style: { fontSize: "12px" } }}
                    />
                    <TextField
                        error={errorOne}
                        helperText={errorOne && "Empty Entry"}
                        required
                        onChange={e => (setOptionOne(e.target.value), e.target.value != "" ? setErrorOne(false) : setErrorOne(true))}
                        value={optionOne}
                        label="First"
                        style={{ minWidth: "300px" }}
                        inputProps={{ style: { fontSize: "14px" } }}
                        InputLabelProps={{ style: { fontSize: "12px" } }}
                    />
                    <TextField
                        error={errorTwo}
                        helperText={errorTwo && "Empty Entry"}
                        required
                        onChange={e => (setOptionTwo(e.target.value), e.target.value != "" ? setErrorTwo(false) : setErrorTwo(true))}
                        value={optionTwo}
                        label="Second"
                        style={{ minWidth: "300px" }}
                        inputProps={{ style: { fontSize: "14px" } }}
                        InputLabelProps={{ style: { fontSize: "12px" } }}
                    />
                    <TextField
                        error={errorThree}
                        helperText={errorThree && "Empty Entry"}
                        required
                        onChange={e => (setOptionThree(e.target.value), e.target.value != "" ? setErrorThree(false) : setErrorThree(true))}
                        value={optionThree}
                        label="Third"
                        style={{ minWidth: "300px" }}
                        inputProps={{ style: { fontSize: "14px" } }}
                        InputLabelProps={{ style: { fontSize: "12px" } }}
                    />
                    <TextField
                        error={errorFour}
                        helperText={errorFour && "Empty Entry"}
                        required
                        onChange={e => (setOptionFour(e.target.value), e.target.value != "" ? setErrorFour(false) : setErrorFour(true))}
                        value={optionFour}
                        label="Fourth"
                        style={{ minWidth: "300px" }}
                        inputProps={{ style: { fontSize: "14px" } }}
                        InputLabelProps={{ style: { fontSize: "12px" } }}
                    />
                </div>
                <Button type="submit" style={{ width: "10%", marginTop: "12px" }} onClick={onClickSubmit}>
                    SUBMIT
                </Button>
                <Button style={{ width: "10%", marginTop: "12px" }} onClick={() => history.goBack()}> 
                    CANCEL
                </Button>
                <Button disabled={backDisabled} style={{ width: "10%", marginTop: "12px" }} onClick={onBackClick}>
                    Back
                </Button>
                <Button
                    type="submit"
                    disabled={nextDisabled}
                    style={{ width: "10%", marginTop: "12px" }}
                    onClick={onNextClick}
                >
                    Next
                </Button>
                <Button
                    disabled={questionDisabled}
                    style={{ width: "10%", marginTop: "12px" }}
                    onClick={addQuestion}
                >
                    Add Question
                </Button>
                <Button disabled={deleteDisabled} style={{ width: "10%", marginTop: "12px" }} onClick={onDeleteClick}>
                    Delete
                </Button>
                </Box>
            </div>
            
        </div>
    );
}

export default CreateQuestion;