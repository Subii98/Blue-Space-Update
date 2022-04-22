import axios from "axios";
import React, { useState, useEffect } from "react";
import QuizCard from "./QuizCard.js";
import LoadingModal from "../components/LoadingModal.js";
import MessageModal from "../components/MessageModal.js";
import { useIsMounted } from "../components/useIsMounted.js";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";

function Quiz(props) {
    const [quizId, setQuizId] = useState();
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [platform, setPlatform] = useState();
    const [user, setUser] = useState();
    const [topQuiz, setTopQuiz] = useState();
    const isMounted = useIsMounted();
    const history = useHistory();

    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3)
    const [itemOffset, setItemOffset] = useState(0);


    useEffect(() => {
        if (user && platform) {
            if (user._id == platform.userId) {
                setIsOwner(true);
            }
        }
    });

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(quizzes.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(quizzes.length / itemsPerPage));
    }, [quizzes])

    useEffect(() => {

    }, [currentItems])

    useEffect(() => {
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(quizzes.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(quizzes.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % quizzes.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

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

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (props.platformId) {
            fetchPlatform();
        }
        fetchUser();
        if (props.platformId) fetchQuiz();
    }, [props.platformId]);

    function fetchPlatform() {
        axios
            .get("/api/platforms/by_id/" + props.platformId)
            .then(res => {
                setPlatform(res.data);
                return;
            })
            .catch(error => {
                console.log(error);
            });
    }
    function fetchQuiz() {
        axios
            .get("/api/quizzes/" + props.platformId)
            .then(res => {
                setLoading(true);
                if (isMounted.current) {
                    const data = res.data;
                    setQuizzes(data);
                    const maxLikes = (Math.max(...data.map(({ likes }) => likes)))
                    setTopQuiz(data.filter(({ likes }) => likes === maxLikes))
                    setLoading(false);
                    return;
                }
            })
            .catch(error => {
                setError("Error loading quiz");
                setLoading(false);
                console.log("Error loading quiz");
            });
    }

    function QuizItems(props) {
        return (
          <>
          {props.currentItems && props.currentItems.map(quiz => (<QuizCard quiz={quiz}/>))}
          </>
        );
    }

    return (
        <div className="quizCardArea">
            {loading ? (
                <LoadingModal></LoadingModal>
            ) : error ? (
                <MessageModal variant="danger">{error}</MessageModal>
            ) : (
                <div className="platformQuiz">
                    {!props.onlyTopQuiz? <div className="platformQuiz2">
                        <QuizItems currentItems={currentItems}/>
                        <ReactPaginate
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="<"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                        />
                    </div>
                    : topQuiz ? topQuiz.map(quiz => (
                        <QuizCard quiz={quiz} />
                    ))
                    : false}
                    
                </div>
            )}
        </div>
    );
}

export default Quiz;
