import React, { useEffect, useState } from "react";
import axios from "axios";
import Tags from "../components/Tags.js";
import PostArea from "../components/PostArea.js";
import Question from "../components/Question.js";
import LoadingModal from "../components/LoadingModal.js";
import MessageModal from "../components/MessageModal.js";
import Quiz from "../components/Quiz.js";

function QuizScreen(props) {
    const [quiz, setQuiz] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [platformId ,setPlatformId] = useState()
    const [platform, setPlatform] = useState()

    useEffect(() => {
        if (props.match.params.quizId){
            fetchQuiz();
        }
    }, []);

    function fetchQuiz() {
        axios
            .get("/api/questions/get_question/" + props.match.params.quizId)
            .then(res => {
                setLoading(true);
                setQuiz(res.data);
                setLoading(false);
                return;
            })
            .catch(error => {
                setError("Error loading quiz");
                setLoading(false);
                console.log("Error loading quiz");
            });
    }

    return (
        <div>
            {loading ? (
                <LoadingModal></LoadingModal>
            ) : error ? (
                <MessageModal variant="danger">{error}</MessageModal>
            ) : (
                <div className="platformQuizTake">
                    {quiz && quiz.length > 0 ? (
                        <Question quizID={props.match.params.quizId} question={quiz}></Question>
                    ) : (
                        <></>
                    )}
                </div>
            )}
        </div>
    );
}

export default QuizScreen;
