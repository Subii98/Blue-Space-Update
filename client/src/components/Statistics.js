import React from 'react'
import { useState, useEffect } from 'react';

function Statistics(props) {
    const correct = props.correct
    const first = props.question.first
    const second = props.question.second
    const third = props.question.third
    const fourth = props.question.fourth
    const answer = props.question.answer
    const [firstStat, setFirstStat] = useState(Math.round(( first / (first+second+third+fourth)) * 100))
    const [secondStat, setSecondStat] = useState(Math.round(( second / (first+second+third+fourth)) * 100))
    const [thirdStat, setThridStat] = useState(Math.round(( third / (first+second+third+fourth)) * 100))
    const [fourthStat, setFourthStat] = useState(Math.round(( fourth / (first+second+third+fourth)) * 100))

    if (answer == 1){
        if (correct){
            return(<div className="result" id="result">
            <p>Correct!</p>
            {isNaN(first+second+third+fourth) || (first+second+third+fourth == 0) ?
                <p>0% of users got this question right</p>
            : 
                <p>{firstStat}% of users got this question right</p>}
        </div>)
        }
        else{
            return(<div className="result" id="result">
            <p>Wrong!</p>
            <p>Answer: {answer}</p>
            {isNaN(first+second+third+fourth) || (first+second+third+fourth == 0) ?
                <p>0% of users got this question right</p>
            : 
                <p>{firstStat}% of users got this question right</p>}
        </div>)
        }
    }
    else if (answer == 2){
        if (correct){
            return(<div className="result" id="result">
            <p>Correct!</p>
            {isNaN(first+second+third+fourth) || (first+second+third+fourth == 0) ?
                <p>0% of users got this question right</p>
            : 
                <p>{secondStat}% of users got this question right</p>}
        </div>)
        }
        else{
            return(<div className="result" id="result">
            <p>Wrong!</p>
            <p>Answer: {answer}</p>
            {isNaN(first+second+third+fourth) || (first+second+third+fourth == 0) ?
                <p>0% of users got this question right</p>
            : 
                <p>{secondStat}% of users got this question right</p>}
        </div>)
        }
    }
    else if (answer == 3){
        if (correct){
            return(<div className="result" id="result">
            <p>Correct!</p>
            {isNaN(first+second+third+fourth) || (first+second+third+fourth == 0) ?
                <p>0% of users got this question right</p>
            : 
                <p>{thirdStat}% of users got this question right</p>}
        </div>)
        }
        else{
            return(<div className="result" id="result">
            <p>Wrong!</p>
            <p>Answer: {answer}</p>
            {isNaN(first+second+third+fourth) || (first+second+third+fourth == 0) ?
                <p>0% of users got this question right</p>
            : 
                <p>{thirdStat}% of users got this question right</p>}
        </div>)
        }
    }
    else{
        if (correct){
            return(<div className="result" id="result">
            <p>Correct!</p>
            {isNaN(first+second+third+fourth) || (first+second+third+fourth == 0) ?
                <p>0% of users got this question right</p>
            : 
                <p>{fourthStat}% of users got this question right</p>}
        </div>)
            
        }
        else{
            return(<div className="result" id="result">
            <p>Wrong!</p>
            <p>Answer: {answer}</p>
            {isNaN(first+second+third+fourth) || (first+second+third+fourth == 0) ?
                <p>0% of users got this question right</p>
            : 
                <p>{fourthStat}% of users got this question right</p>}
        </div>)
        }
    }
    
}

export default Statistics