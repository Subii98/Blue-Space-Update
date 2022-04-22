import React, { useEffect, useState } from "react";
import axios from "axios";
import Tags from "../components/Tags.js";
import PostArea from "../components/PostArea.js";
//import Question from "../components/Question.js";
import LoadingModal from "../components/LoadingModal.js";
import MessageModal from "../components/MessageModal.js";
import PlatformListArea from "../components/PlatformListArea.js";
import { useIsMounted } from "../components/useIsMounted.js";
import Quiz from "../components/Quiz.js";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import QuizCard from "../components/QuizCard.js";


function PlatformScreen(props) {
  //to check quiz _id matches _id of the url /quiz/_id
  const [quizId, setQuizId] = useState(["001", "002"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [platform, setPlatform] = useState()
  const [user, setUser] = useState();
  const [topQuiz, setTopQuiz] = useState();
  const isMounted = useIsMounted();
  //const platform = data.platforms.find( x => x._id === props.match.params._id)

  const [isOwner, setIsOwner] = useState(false);
  const history = useHistory();
  useEffect(() => {
      if (user && platform) {
          if (user._id == platform.userId) {
              setIsOwner(true);
          }
      }
  });


  useEffect(() => {
    isMounted.current = true
    fetchPlatform()
    fetchUser();
    return () => {isMounted.current = false}
  }, []);


  function fetchPlatform(){
    axios
         .get('/api/platforms')
         .then((res) => {
            if (isMounted.current){
              setLoading(true)
              console.log(props.match.params.id)
              setPlatform(res.data.find( x => x._id === props.match.params.id))
              setLoading(false)
              return
            }
            
         })
         .catch((error) => {
           setError(
             "Error loading platform"
           );
           setLoading(false)
   console.log("Error loading platform");
         });
  }

  function fetchUser() {
    let userData = localStorage.getItem("data");
    userData = JSON.parse(userData);
    axios
        .get("/api/v1/get_user?user_id=" + userData.id)
        .then(res => setUser(res.data))
        .catch(error => {
            setError("No userdata");
        });
  }

  return (
    <div>
        {loading ? (
            <LoadingModal></LoadingModal>
        ) : error ? (
            <MessageModal variant="danger">{error}</MessageModal>
        ) : (
            <div className="platform">
                {platform && <Tags platform={platform} />}
                {platform && <PostArea platform={platform} />}
                <div className="platformContentArea2">
                  <Button
                            className="createQuizButton"
                            style={isOwner ? {} : { display: "none" }}
                            onClick={() => history.push("/CreateQuiz/" + props.match.params.id)}
                      >
                            Create Quiz
                      </Button>
                  <div className="platformContentArea">
                    <div className="platformQuizHeader">
                        <p>Quiz</p>
                        <div className="linePlatform" />                      
                        <Quiz platformId={platform ? platform._id : null} onlyTopQuiz={false}/>
                    </div>
                    <div className="topRatedQuiz">                    
                      <p>Top Rated</p>
                      <div className="linePlatform2" />
                      <Quiz platformId={platform ? platform._id : null} onlyTopQuiz={true}/>
                    </div>
                  </div>
                </div>
                
            </div>
        )}
    </div>
  );  
}

export default PlatformScreen;
