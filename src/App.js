import React from "react"
import Home from './components/Home'
import Question from "./components/Question"
import Settings from "./components/Settings"
import Main from "./components/Main"
import "./style.css"
// [0].question
// [0].correct_answer
// [0].incorrect_answers (array)
// https://opentdb.com/api.php?amount=4&category=10&difficulty=medium

export default function App() {
    const [quizzes, setQuizzes] = React.useState([]);  // te array of quizzes which we restructure in the useEffect function
    const [gameOver, setGameOver] = React.useState(false); // runs when the game is over
    const [newGame, setNewGame] = React.useState(false); // runs every time we need to call to the api, doesn't really matter what this value is
    const [score, setScore] = React.useState(""); // to keep track of how many you got right out of the total
    const [load, setLoad] = React.useState(false); // this is to help me onlu render buttons as soon as the whole page renders, not before
    const [page, setPage] = React.useState('home');
    const [formVal, setFormVal] = React.useState({status: true, text: "Please enter a value!"});
    // const [runAPI, setRunAPI] = React.useState(false);
    const [data, setData] = React.useState({
        numberOfQuestions: "4",
        category: "",
        difficulty: ""
    });
    
    // console.log(data.numberOfQuestions)
    
    function handleChange(event) {
        // console.log(event.target);
        const {name, value} = event.target;
        setData(prev => {
            return {...prev, [name]: value}
        });
    }
    
    function showQuizzes() {
        setPage("main");
    }
    
    function showSettings() {
        setPage("settings");
    }
    
    
    // This is what happes when an answer is clicked on. All the other answers will automatically be unclicked
    function choose(questionId, id) {
        // console.log(id);
        if(!gameOver) {
            setQuizzes(prev => prev.map(i => {
                return questionId === i.id ? {...i, answers: i.answers.map(j => {
                    return j.id === id ? {...j, isSelected: true, className: "selected"} : {...j, isSelected: false, className: "answer"}
                })} : i
            }));
        }
    }
    
    // I just made this so i can check if my classes are changing since I can't inspect the page bcos i'm in Scrimba
    function checkClass(id) {
        // console.log(id);
    }



    function checkScore() {
        let score = 0;
        quizzes.forEach(i => {
            return i.answers.forEach(j => {
                return j.className === "selected" && j.isCorrect ? score += 1 : null
            });
        });
        return `You scored ${score}/${data.numberOfQuestions} correct answers`
    }
    
    function checkAnswers() {
        setQuizzes(prev => prev.map(i => {
            return {...i, answers: i.answers.map(j => {
                return j.isCorrect ? {...j, className: "correct"} :
                    j.isSelected && !j.isCorrect ? {...j, className: "incorrect"}  :
                        {...j, className: "unselected"}
            })}
        }));
    }
    
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array
    }
    
    function fixString(str) {
        const fixed = str.replace(/(&quot;)/g, '');
        const fixed1 = fixed.replace(/(&#039;)/g, '');
        const fixed2 = fixed1.replace(/(&ldquo;)/g, '');
        const fixed3 = fixed2.replace(/(&amp;)/g, '');
        const fixed4 = fixed3.replace(/(&rdquo;)/g, '');
        const fixed5 = fixed4.replace(/(acute)/g, '');
        const fixed6 = fixed5.replace(/&/g, '');
        const fixed7 = fixed6.replace(/(;)/g, '');
        return fixed7
    }
    
    React.useEffect(() => {
        // alert('useEffect function ran');
        async function api() {
            // console.log("a")
            let category = data.category && `&category=${data.category}`;
            let difficulty = data.difficulty && `&difficulty=${data.difficulty}`;
            const quiz = await fetch(`https://opentdb.com/api.php?amount=${data.numberOfQuestions}${category}${difficulty}`);
            const result = await quiz.json();
            // setQuizzes(result.results);
            setQuizzes(() => result.results.map(i => {
                // const arr = [];
                return {
                    question: i.question,
                    id: `${i.question}-id`,
                    answers: shuffleArray([{text: i.correct_answer, isSelected: false, id: `${i.correct_answer}-id`, isCorrect: true, className: "answer"}, ...i.incorrect_answers.map(j => {
                        return {text: j, isSelected: false, id: `${j}-id`, isCorrect: false, className: "answer"}
                    })])
                }
            }));
            setLoad(true);
            
        }

        api();
        if(!data.numberOfQuestions) {
            setFormVal(prev => {
                return {...prev, status: false}
            });
        } else {
            setFormVal(prev => {
                return {...prev, status: true}
            });
        }
        // setRunAPI(false);
    }, [newGame, data.category, data.numberOfQuestions, data.difficulty]);
    
    function checkAnsBtn(event) {
        event.stopPropagation();
        checkAnswers();
        setScore(checkScore());
        setGameOver(true);
        setLoad(false)
    }
    
    
    function playAgainBtn() {
        setGameOver(false);
        setNewGame(prev => !prev);
        setQuizzes([]);
        setScore("");
    }
    
    
    // const noSpecialCharacters = str.replace(/[^a-zA-Z0-9 ]/g, '');
    const questions = quizzes.map(question => {
        const fixed = fixString(question.question);
        return <Question key={fixed} id={fixed} question={fixed} arr={[question.answers, question.id]} choose={choose} checkClass={checkClass} fixString={fixString}/>
    });
    
    return (
        <>
            {
                page === "home" ? <Home showSettings={showSettings}/> :
                page === "settings" ? <Settings handleChange={handleChange} data={data} showQuizzes={showQuizzes} playAgainBtn={playAgainBtn} setLoad={setLoad} formVal={formVal} setFormVal={setFormVal}/> :
                <Main questions={questions} playAgainBtn={playAgainBtn} checkAnsBtn={checkAnsBtn} gameOver={gameOver} score={score} load={load} showSettings={showSettings}/>
            }
        </>
    )
}