import React from "react"
import blob1 from "../images/blobs.png";
import blob2 from "../images/blob2.png";

export default function Main(props) {
    return (
        <main>
            <img src={blob1} className="blob1" alt=""/>
            <img src={blob2} className="blob2" alt=""/>
            <div className="quiz-holder">
                {props.questions}
            </div>
            <div className="result">
                <div className="result-text">{props.score}</div>
                {
                    !props.gameOver ? <button className="check" 
                    style={{display: !props.load ? 'none' : 'block'}} 
                    onClick={(event) => {
                        props.checkAnsBtn(event);
                    }}>Check answers</button> :
                    <div className="button-holder"><button className="again bottomBtn" onClick={props.playAgainBtn}>Play Again</button><button onClick={props.showSettings} className="bottomBtn">Change Settings</button></div>
                }
            </div>
        </main>
    )
}