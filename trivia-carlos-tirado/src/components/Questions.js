import React, { useEffect, useState } from 'react'
import axios from 'axios'


function Questions(categoryURL) {
    const { categoryID } = categoryURL
    const [triviaQuestions, setTriviaQuestions] = useState([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [count, setCount] = useState(0)


    //decode and make html readable for questions 
    function decodeHtml(html) {
        let txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    // estableciendo new array para las respuestas al azar
    function getShuffledArr(arr) {
        const newArr = arr.slice()
        for (let i = newArr.length - 1; i > 0; i--) {
            const rand = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
        }
        return newArr
    }

    //llamando las preguntas 
    useEffect(() => {
        axios
            .get(`https://opentdb.com/api.php?amount=5&category=${categoryID}&type=multiple`)
            .then((res) => { setTriviaQuestions(res.data.results) })
    }, [categoryID])

    //organize answer list instead of map 
    function getAnswerList() {
        console.log(`categoryID ${categoryID}`)
        console.log(`current index ${currentQuestionIndex}`)
        console.log(`trivia questions ${triviaQuestions}`)
        let incorrectAnswers = triviaQuestions[currentQuestionIndex].incorrect_answers
        let correctAnswers = triviaQuestions[currentQuestionIndex].correct_answer
        let combinedAnswers = [...incorrectAnswers, correctAnswers]
        let shuffledArr = getShuffledArr(combinedAnswers)
        return shuffledArr
    }

    // input answers
    function handleUserAnswer(answer) {
        let correctAnswers = triviaQuestions[currentQuestionIndex].correct_answer
        if (answer === triviaQuestions[currentQuestionIndex].correct_answer) {
            // console.log("OK")
            alert("That is correct.")
            { setCount(count + 1) }
        } else {
            // console.log("wrong")
            alert(`You're WRONG, The Answer is ${correctAnswers}`)
        }
        { setCurrentQuestionIndex(currentQuestionIndex + 1) }
    }


    //return Questions function
    return (
        
        <>
            <div className='questionsList'>
                {triviaQuestions.length > 0 &&
                    <>
                        <h1>Question {currentQuestionIndex + 1}:<br />
                            {decodeHtml(triviaQuestions[currentQuestionIndex].question)}</h1>
                        <ul>
                            {getAnswerList().map(
                                (answer, index) => <li key={index}>
                                    <button className='answerButtons' onClick={() => { handleUserAnswer(answer) }}>{decodeHtml(answer)}</button>
                                </li>
                            )}
                        </ul>

                        <button className='score'>You have {count} right answers.</button>
                    </>
                }
            </div>
            </>
    )
}

export default Questions